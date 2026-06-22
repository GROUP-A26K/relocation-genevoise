import { z } from "zod";
import { type TranslationValues } from "next-intl";

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

type TFormTranslator = (key: string, object?: TranslationValues) => string;

const baseLeadShape = (t?: TFormTranslator) => ({
  full_name: z
    .string()
    .min(2, {
      message:
        t?.("fullNameMinLength") ?? "Full name must have at least 2 characters.",
    })
    .max(100, {
      message:
        t?.("fullNameMaxLength") ??
        "Full name can have a maximum of 100 characters.",
    }),
  email: z.string().email({
    message: t?.("emailInvalid") ?? "Please enter a valid email address.",
  }),
  phone: z.string().regex(phoneRegex, {
    message:
      t?.("phoneInvalid") ??
      "Invalid phone number! Please make sure it follows a valid format.",
  }),
  property_type: z.string().refine((val) => val !== "", {
    message: t?.("propertyTypeRequired") ?? "Please select a property type.",
  }),
  number_of_rooms: z.string().refine((val) => val !== "", {
    message: t?.("numberOfRoomsRequired") ?? "Please select the number of rooms.",
  }),
  accept: z.boolean().refine((val) => val === true, {
    message: t?.("acceptRequired") ?? "You must accept to proceed.",
  }),
});

export function landlordsFormSchema(t?: TFormTranslator) {
  return z.object({
    ...baseLeadShape(t),
    property_address: z.string().min(2, {
      message:
        t?.("addressRequired") ?? "Please enter the property address.",
    }),
    additional_info: z.string().max(1000).optional(),
  });
}

export function tenantFormSchema(t?: TFormTranslator) {
  return z.object({
    ...baseLeadShape(t),
    property_address: z.string().min(2, {
      message: t?.("addressRequired") ?? "Please enter the rental address.",
    }),
  });
}

export type LandlordsFormInput = z.infer<ReturnType<typeof landlordsFormSchema>>;
export type TenantFormInput = z.infer<ReturnType<typeof tenantFormSchema>>;
