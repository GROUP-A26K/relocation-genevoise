import { z } from "zod";
import { type TranslationValues } from "next-intl"; // Make sure to import this if using next-intl

// Phone regex for validation
const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

// Contact form validation schema
export function contactSchema(
  t?: (key: string, object?: TranslationValues) => string
) {
  return z.object({
    first_name: z
      .string()
      .min(2, {
        message:
          t?.("firstNameMinLength") ??
          "First name must have at least 2 characters.",
      })
      .max(50, {
        message:
          t?.("firstNameMaxLength") ??
          "First name can have a maximum of 50 characters.",
      }),
    last_name: z
      .string()
      .min(2, {
        message:
          t?.("lastNameMinLength") ??
          "Last name must have at least 2 characters.",
      })
      .max(50, {
        message:
          t?.("lastNameMaxLength") ??
          "Last name can have a maximum of 50 characters.",
      }),
    email: z.string().email({
      message: t?.("emailInvalid") ?? "Please enter a valid email address.",
    }),
    phone: z.string().regex(phoneRegex, {
      message:
        t?.("phoneInvalid") ??
        "Invalid phone number! Please make sure it follows a valid format.",
    }),
    subject: z.string().refine((val) => val !== "", {
      message: t?.("subjectRequired") ?? "Please select a help option.",
    }),
    message: z.string().optional(),
    company: z.string().optional(),
    accept: z.boolean().refine((val) => val === true, {
      message: t?.("acceptRequired") ?? "You must accept to proceed.",
    }),
  });
}

export type ContactFormInput = z.infer<ReturnType<typeof contactSchema>>;
