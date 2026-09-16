import { z } from 'zod';

import type { useTranslations } from 'next-intl';

type TValidationTranslator = ReturnType<
  typeof useTranslations<'Validation.Subscribe'>
>;

export function subscribeSchema(t?: TValidationTranslator) {
  return z.object({
    email: z.string().email({
      message: t?.('emailInvalid') ?? 'Please enter a valid email address.', // Dynamic translation
    }),
  });
}

export type SubscribeFormInput = z.infer<ReturnType<typeof subscribeSchema>>;
