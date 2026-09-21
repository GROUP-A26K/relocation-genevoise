import { z } from 'zod';

import { FIELD_LIMITS, maxLengthMessage } from './fieldLimits';

import type { useTranslations } from 'next-intl';

// Phone regex for validation
type TValidationTranslator = ReturnType<
  typeof useTranslations<'Validation.Application'>
>;

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const MAX_CTC = 10_000_000_000;

export const MAX_RESUME_FILE_BYTES = 5 * 1024 * 1024;

const fileAccept = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export function applicationSchema(t?: TValidationTranslator) {
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
    experience_years: z
      .string()
      .trim()
      .max(
        FIELD_LIMITS.experienceYears,
        maxLengthMessage(t, FIELD_LIMITS.experienceYears)
      )
      .refine((val) => val !== '', {
        message: t?.('experienceYearsRequired') ?? 'Please select your role',
      }),
    expected_ctc: z
      .string()
      .trim()
      .max(
        FIELD_LIMITS.expectedCtc,
        maxLengthMessage(t, FIELD_LIMITS.expectedCtc)
      )
      .refine(
        (val) => {
          if (val === '') return true;

          const amount = Number(val);

          return Number.isFinite(amount) && amount >= 0 && amount < MAX_CTC;
        },
        {
          message:
            t?.('expectedCtcRequired') ??
            'Expected CTC must be a valid number.',
        }
      )
      .optional(),

    resume_file: z
      .instanceof(File, {
        message: t?.('resumeRequired') ?? 'Please upload your résumé.',
      })
      .refine(
        (file) => fileAccept.includes(file.type),
        t?.('resumeInvalidType') ?? 'Only PDF or DOCX files are allowed.'
      )
      .refine(
        (file) => file.size <= MAX_RESUME_FILE_BYTES,
        t?.('resumeTooLarge') ?? 'Max file size is 5 MB.'
      ),
    department: z
      .string()
      .trim()
      .max(
        FIELD_LIMITS.department,
        maxLengthMessage(t, FIELD_LIMITS.department)
      ),
    position: z
      .string()
      .trim()
      .max(FIELD_LIMITS.position, maxLengthMessage(t, FIELD_LIMITS.position)),
    accept: z.boolean().refine((val) => val === true, {
      message: t?.('acceptRequired') ?? 'You must accept to proceed.',
    }),
  });
}

export type TApplicationFormInput = z.infer<
  ReturnType<typeof applicationSchema>
>;
