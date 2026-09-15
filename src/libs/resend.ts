import { Resend } from 'resend';

import { Env } from './env';

const resendKey = Env.RESEND_API_KEY;

export const resend = new Resend(resendKey);
