import { Env } from '@/libs/env';

import { reportApiError } from './reportApiError';

const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const VERIFY_TIMEOUT_MS = 5000;
const MAX_TOKEN_LENGTH = 2048;

export const isTurnstileEnabled = Boolean(
  Env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && Env.TURNSTILE_SECRET_KEY
);

export async function verifyTurnstile(
  route: string,
  token: unknown,
  ip: string | null
): Promise<boolean> {
  const secret = Env.TURNSTILE_SECRET_KEY;

  if (!secret) return false;

  if (
    typeof token !== 'string' ||
    token === '' ||
    token.length > MAX_TOKEN_LENGTH
  ) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });

  if (ip) body.set('remoteip', ip);

  try {
    const response = await fetch(VERIFY_URL, {
      method: 'POST',
      body,
      cache: 'no-store',
      signal: AbortSignal.timeout(VERIFY_TIMEOUT_MS),
    });

    if (!response.ok) return false;

    const result: unknown = await response.json();

    return (
      typeof result === 'object' &&
      result !== null &&
      (result as { success?: unknown }).success === true
    );
  } catch (error) {
    reportApiError(route, 'captcha', error);

    return false;
  }
}
