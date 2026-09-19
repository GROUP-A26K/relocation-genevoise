import { Env } from '@/libs/env';
import { prisma } from '@/libs/prisma';
import { Subscribe } from '@/templates/Email/Subscribe';
import { createLeadHandler } from '@/libs/api/leadHandler';
import {
  type TSubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';

const senderEmail = Env.RESEND_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const successEmail = {
  en: 'You’re Now Subscribed!',
  fr: 'Vous êtes à présent bien inscrit.',
} as const;

const subjectTitle = {
  en: 'Welcome to our service!',
  fr: 'Bienvenue dans notre service!',
} as const;

const createSubscribe = async (data: TSubscribeFormInput) => {
  const existing = await prisma.subscribe.findUnique({
    where: { email: data.email },
    select: { id: true },
  });

  if (existing) return null;

  return prisma.subscribe.create({
    data: {
      email: data.email,
      created_at: new Date(),
    },
    select: { id: true },
  });
};

export const POST = createLeadHandler({
  route: 'subscribe',
  schema: subscribeSchema().strict(),
  persist: createSubscribe,
  emails: (data, _persisted, { locale }) => [
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: data.email,
      subject: subjectTitle[locale],
      react: Subscribe({
        subject: successEmail[locale],
        baseUrl,
        locale,
      }),
    },
  ],
});
