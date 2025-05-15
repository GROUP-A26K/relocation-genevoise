import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export function bookingSchema(t?: (key: string) => string) {
  return z.object({
    phone: z.string().regex(phoneRegex, {
      message:
        t?.('phoneInvalid') ??
        'Invalid phone number! Please make sure it follows a valid format.',
    }),
    accept: z.boolean().refine((val) => val === true, {
      message: t?.('acceptRequired') ?? 'You must accept to proceed.',
    }),
  });
}

export type BookingFormInput = z.infer<ReturnType<typeof bookingSchema>>;
