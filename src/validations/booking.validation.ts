import { z } from 'zod';

import { FIELD_LIMITS, maxLengthMessage } from './fieldLimits';

import type { useTranslations } from 'next-intl';

type TValidationTranslator = ReturnType<
  typeof useTranslations<'Validation.Booking'>
>;

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export function bookingSchema(t?: TValidationTranslator) {
  return z.object({
    phone: z
      .string()
      .trim()
      .max(FIELD_LIMITS.phone, maxLengthMessage(t, FIELD_LIMITS.phone))
      .regex(phoneRegex, {
        message:
          t?.('phoneInvalid') ??
          'Invalid phone number! Please make sure it follows a valid format.',
      }),
    accept: z.boolean().refine((val) => val === true, {
      message: t?.('acceptRequired') ?? 'You must accept to proceed.',
    }),

    contactVia: z.enum(['telephone', 'whatsapp']).default('telephone'),
  });
}

export type TBookingFormInput = z.infer<ReturnType<typeof bookingSchema>>;
