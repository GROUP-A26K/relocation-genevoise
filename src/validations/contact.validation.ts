import { z } from 'zod';

import { FIELD_LIMITS, maxLengthMessage } from './fieldLimits';

import type { useTranslations } from 'next-intl';

// Phone regex for validation
type TValidationTranslator = ReturnType<
  typeof useTranslations<'Validation.Contact'>
>;

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Contact form validation schema
export function contactSchema(t?: TValidationTranslator) {
  return z.object({
    first_name: z
      .string()
      .trim()
      .min(2, {
        message:
          t?.('firstNameMinLength') ??
          'First name must have at least 2 characters.',
      })
      .max(50, {
        message:
          t?.('firstNameMaxLength') ??
          'First name can have a maximum of 50 characters.',
      }),
    last_name: z
      .string()
      .trim()
      .min(2, {
        message:
          t?.('lastNameMinLength') ??
          'Last name must have at least 2 characters.',
      })
      .max(50, {
        message:
          t?.('lastNameMaxLength') ??
          'Last name can have a maximum of 50 characters.',
      }),
    email: z
      .string()
      .trim()
      .max(FIELD_LIMITS.email, maxLengthMessage(t, FIELD_LIMITS.email))
      .email({
        message: t?.('emailInvalid') ?? 'Please enter a valid email address.',
      }),
    phone: z
      .string()
      .trim()
      .max(FIELD_LIMITS.phone, maxLengthMessage(t, FIELD_LIMITS.phone))
      .regex(phoneRegex, {
        message:
          t?.('phoneInvalid') ??
          'Invalid phone number! Please make sure it follows a valid format.',
      }),
    subject: z
      .string()
      .trim()
      .max(FIELD_LIMITS.subject, maxLengthMessage(t, FIELD_LIMITS.subject))
      .refine((val) => val !== '', {
        message: t?.('subjectRequired') ?? 'Please select a help option.',
      }),
    message: z
      .string()
      .trim()
      .max(FIELD_LIMITS.message, maxLengthMessage(t, FIELD_LIMITS.message))
      .optional(),
    company: z
      .string()
      .trim()
      .max(FIELD_LIMITS.company, maxLengthMessage(t, FIELD_LIMITS.company))
      .optional(),
    accept: z.boolean().refine((val) => val === true, {
      message: t?.('acceptRequired') ?? 'You must accept to proceed.',
    }),
  });
}

export type TContactFormInput = z.infer<ReturnType<typeof contactSchema>>;
