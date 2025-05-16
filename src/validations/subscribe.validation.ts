import { z } from 'zod';

export function subscribeSchema(t?: (key: string) => string) {
  return z.object({
    email: z.string().email({
      message: t?.('emailInvalid') ?? 'Please enter a valid email address.', // Dynamic translation
    }),
  });
}

export type SubscribeFormInput = z.infer<ReturnType<typeof subscribeSchema>>;
