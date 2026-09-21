import { Resend, type CreateEmailOptions } from 'resend';

import { Env } from './env';

const resendKey = Env.RESEND_API_KEY;

export const resend = new Resend(resendKey);

export class EmailDeliveryError extends Error {
  constructor(public readonly code: string) {
    super('Email delivery failed');
    this.name = 'EmailDeliveryError';
  }
}

export async function sendEmail(options: CreateEmailOptions): Promise<void> {
  const { error } = await resend.emails.send(options);

  if (error) throw new EmailDeliveryError(error.name);
}
