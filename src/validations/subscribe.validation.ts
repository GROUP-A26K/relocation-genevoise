import { z } from 'zod';

import { FIELD_LIMITS, maxLengthMessage } from './fieldLimits';

import type { useTranslations } from 'next-intl';

type TValidationTranslator = ReturnType<
  typeof useTranslations<'Validation.Subscribe'>
>;

export function subscribeSchema(t?: TValidationTranslator) {
  return z.object({
    email: z
      .string()
      .trim()
      .max(FIELD_LIMITS.email, maxLengthMessage(t, FIELD_LIMITS.email))
      .email({
        message: t?.('emailInvalid') ?? 'Please enter a valid email address.',
      }),
  });
}

export type TSubscribeFormInput = z.infer<ReturnType<typeof subscribeSchema>>;
