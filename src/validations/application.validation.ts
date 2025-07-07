import { z } from 'zod';
import { type TranslationValues } from 'next-intl'; // Make sure to import this if using next-intl

// Phone regex for validation
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const fileAccept = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
];

export function applicationSchema(
  t?: (key: string, object?: TranslationValues) => string
) {
  return z.object({
    first_name: z
      .string()
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
    email: z.string().email({
      message: t?.('emailInvalid') ?? 'Please enter a valid email address.',
    }),
    phone: z.string().regex(phoneRegex, {
      message:
        t?.('phoneInvalid') ??
        'Invalid phone number! Please make sure it follows a valid format.',
    }),
    experience_years: z.string().refine((val) => val !== '', {
      message: t?.('experienceYearsRequired') ?? 'Please select your role',
    }),
    expected_ctc: z
      .string()
      .refine(
        (val) => {
          if (!val || val.trim() === '') return true;
          return !isNaN(Number(val));
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
        (file) => file.size <= 500 * 1024 * 1024,
        t?.('resumeTooLarge') ?? 'Max file size is 500 MB.'
      ),
    department: z.string(),
    position: z.string(),
    accept: z.boolean().refine((val) => val === true, {
      message: t?.('acceptRequired') ?? 'You must accept to proceed.',
    }),
  });
}

export type ApplicationFormInput = z.infer<
  ReturnType<typeof applicationSchema>
>;
