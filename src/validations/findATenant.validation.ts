import { z } from 'zod';

import { FIELD_LIMITS, maxLengthMessage } from './fieldLimits';

import type { useTranslations } from 'next-intl';

type TValidationTranslator = ReturnType<
  typeof useTranslations<'Validation.FindATenant'>
>;

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

type TFormTranslator = TValidationTranslator;

const baseLeadShape = (t?: TFormTranslator) => ({
  full_name: z
    .string()
    .trim()
    .min(2, {
      message:
        t?.('fullNameMinLength') ??
        'Full name must have at least 2 characters.',
    })
    .max(100, {
      message:
        t?.('fullNameMaxLength') ??
        'Full name can have a maximum of 100 characters.',
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
  property_type: z
    .string()
    .trim()
    .max(
      FIELD_LIMITS.propertyType,
      maxLengthMessage(t, FIELD_LIMITS.propertyType)
    )
    .refine((val) => val !== '', {
      message: t?.('propertyTypeRequired') ?? 'Please select a property type.',
    }),
  number_of_rooms: z
    .string()
    .trim()
    .max(
      FIELD_LIMITS.numberOfRooms,
      maxLengthMessage(t, FIELD_LIMITS.numberOfRooms)
    )
    .refine((val) => val !== '', {
      message:
        t?.('numberOfRoomsRequired') ?? 'Please select the number of rooms.',
    }),
  accept: z.boolean().refine((val) => val === true, {
    message: t?.('acceptRequired') ?? 'You must accept to proceed.',
  }),
});

export function landlordsFormSchema(t?: TFormTranslator) {
  return z.object({
    ...baseLeadShape(t),
    property_address: z
      .string()
      .trim()
      .min(2, {
        message: t?.('addressRequired') ?? 'Please enter the property address.',
      })
      .max(
        FIELD_LIMITS.propertyAddress,
        maxLengthMessage(t, FIELD_LIMITS.propertyAddress)
      ),
    additional_info: z
      .string()
      .trim()
      .max(
        FIELD_LIMITS.additionalInfo,
        maxLengthMessage(t, FIELD_LIMITS.additionalInfo)
      )
      .optional(),
  });
}

export function tenantFormSchema(t?: TFormTranslator) {
  return z.object({
    ...baseLeadShape(t),
    property_address: z
      .string()
      .trim()
      .min(2, {
        message: t?.('addressRequired') ?? 'Please enter the rental address.',
      })
      .max(
        FIELD_LIMITS.propertyAddress,
        maxLengthMessage(t, FIELD_LIMITS.propertyAddress)
      ),
  });
}

export type TLandlordsFormInput = z.infer<
  ReturnType<typeof landlordsFormSchema>
>;
export type TTenantFormInput = z.infer<ReturnType<typeof tenantFormSchema>>;
