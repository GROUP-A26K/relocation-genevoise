import { z } from 'zod';

import { AppConfig } from '@/utils/appConfig';

const MAX_PAGE = 1000;
const MAX_PAGE_SIZE = 50;
const MAX_TEXT_LENGTH = 100;

export const boundedInt = (max: number, fallback: number) =>
  z.coerce
    .number()
    .int()
    .min(1)
    .catch(fallback)
    .transform((value) => Math.min(value, max));

export const boundedText = (maxLength: number = MAX_TEXT_LENGTH) =>
  z.string().trim().max(maxLength).default('');

export const createListQuerySchema = (defaultPageSize: number) =>
  z.object({
    locale: z.enum(AppConfig.locales).catch(AppConfig.defaultLocale),
    page: boundedInt(MAX_PAGE, 1),
    pageSize: boundedInt(MAX_PAGE_SIZE, defaultPageSize),
  });

export const readQuery = (request: Request) =>
  Object.fromEntries(new URL(request.url).searchParams);
