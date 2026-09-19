import { isNil } from 'lodash-es';
import { NextResponse } from 'next/server';

import { sendEmail } from '@/libs/resend';
import { HONEYPOT_FIELD, TURNSTILE_FIELD } from '@/utils/formGuard';

import { rateLimit } from './rateLimit';
import { reportApiError } from './reportApiError';
import { isTurnstileEnabled, verifyTurnstile } from './turnstile';
import { getClientIp, isSameOrigin, readLimitedBody } from './requestGuards';

import type { z } from 'zod';
import type { CreateEmailOptions } from 'resend';

type TLeadLocale = 'fr' | 'en';

type TLeadErrorCode =
  | 'method_not_allowed'
  | 'unsupported_media_type'
  | 'forbidden_origin'
  | 'rate_limited'
  | 'payload_too_large'
  | 'invalid_body'
  | 'validation'
  | 'captcha_failed'
  | 'invalid_file'
  | 'internal';

type TLeadBodyType = 'json' | 'multipart';

type TLeadContext = {
  locale: TLeadLocale;
};

type TLeadHandlerOptions<TData, TPersisted> = {
  route: string;
  schema: z.ZodType<TData, z.ZodTypeDef, unknown>;
  bodyType?: TLeadBodyType;
  maxBodyBytes?: number;
  mapBody?: (fields: Record<string, unknown>) => unknown;
  persist: (data: TData, context: TLeadContext) => Promise<TPersisted | null>;
  emails: (
    data: TData,
    persisted: TPersisted,
    context: TLeadContext
  ) => CreateEmailOptions[];
};

const MAX_JSON_BYTES = 64 * 1024;

const CONTENT_TYPES: Record<TLeadBodyType, string> = {
  json: 'application/json',
  multipart: 'multipart/form-data',
};

export class LeadRequestError extends Error {
  constructor(
    public readonly code: TLeadErrorCode,
    public readonly status: number
  ) {
    super(code);
    this.name = 'LeadRequestError';
  }
}

const okResponse = () => NextResponse.json({ status: 'ok' }, { status: 201 });

const errorResponse = (
  code: TLeadErrorCode,
  status: number,
  headers?: Record<string, string>
) => NextResponse.json({ status: 'error', code }, { status, headers });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && !isNil(value) && !Array.isArray(value);

const parseBody = async (
  bytes: Buffer,
  bodyType: TLeadBodyType,
  contentType: string
): Promise<Record<string, unknown> | null> => {
  try {
    if (bodyType === 'json') {
      const payload: unknown = JSON.parse(bytes.toString('utf8'));

      return isRecord(payload) ? payload : null;
    }

    const formData = await new Response(new Uint8Array(bytes), {
      headers: { 'content-type': contentType },
    }).formData();

    return Object.fromEntries(formData.entries());
  } catch {
    return null;
  }
};

export function createLeadHandler<TData, TPersisted>({
  route,
  schema,
  bodyType = 'json',
  maxBodyBytes = MAX_JSON_BYTES,
  mapBody,
  persist,
  emails,
}: TLeadHandlerOptions<TData, TPersisted>) {
  return async function POST(request: Request): Promise<NextResponse> {
    try {
      if (request.method !== 'POST') {
        return errorResponse('method_not_allowed', 405, { Allow: 'POST' });
      }

      const contentType = request.headers.get('content-type') ?? '';

      if (!contentType.includes(CONTENT_TYPES[bodyType])) {
        return errorResponse('unsupported_media_type', 415);
      }

      if (!isSameOrigin(request)) {
        return errorResponse('forbidden_origin', 403);
      }

      const ip = getClientIp(request);
      const limit = rateLimit(`${route}:${ip ?? 'unknown'}`);

      if (!limit.allowed) {
        return errorResponse('rate_limited', 429, {
          'Retry-After': String(limit.retryAfterSeconds),
        });
      }

      if (Number(request.headers.get('content-length') ?? 0) > maxBodyBytes) {
        return errorResponse('payload_too_large', 413);
      }

      const bytes = await readLimitedBody(request, maxBodyBytes);

      if (!bytes) return errorResponse('payload_too_large', 413);

      const body = await parseBody(bytes, bodyType, contentType);

      if (!body) return errorResponse('invalid_body', 400);

      const {
        [HONEYPOT_FIELD]: honeypot,
        [TURNSTILE_FIELD]: turnstileToken,
        ...fields
      } = body;

      if (!isNil(honeypot) && honeypot !== '') return okResponse();

      const parsed = schema.safeParse(mapBody ? mapBody(fields) : fields);

      if (!parsed.success) return errorResponse('validation', 400);

      if (
        isTurnstileEnabled &&
        !(await verifyTurnstile(route, turnstileToken, ip))
      ) {
        return errorResponse('captcha_failed', 403);
      }

      const url = new URL(request.url);
      const context: TLeadContext = {
        locale: url.searchParams.get('locale') === 'en' ? 'en' : 'fr',
      };
      const data = parsed.data;

      let persisted: TPersisted | null;

      try {
        persisted = await persist(data, context);
      } catch (error) {
        if (error instanceof LeadRequestError) throw error;

        reportApiError(route, 'persist', error);

        return errorResponse('internal', 500);
      }

      if (isNil(persisted)) return okResponse();

      try {
        const deliveries = await Promise.allSettled(
          emails(data, persisted, context).map((email) => sendEmail(email))
        );

        deliveries.forEach((delivery) => {
          if (delivery.status === 'rejected') {
            reportApiError(route, 'email', delivery.reason);
          }
        });
      } catch (error) {
        reportApiError(route, 'email', error);
      }

      return okResponse();
    } catch (error) {
      if (error instanceof LeadRequestError) {
        return errorResponse(error.code, error.status);
      }

      reportApiError(route, 'handler', error);

      return errorResponse('internal', 500);
    }
  };
}
