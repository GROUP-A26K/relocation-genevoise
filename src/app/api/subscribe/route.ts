import { NextResponse } from 'next/server';

import { Env } from '@/libs/env';
import { resend } from '@/libs/resend';
import { prisma } from '@/libs/prisma';
import { Subscribe } from '@/templates/Email/Subscribe';
import {
  type TSubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';

const senderEmail = Env.RESEND_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const copy = {
  en: {
    exitEmail: 'Your email is already subscribed.',
    successEmail: 'You’re Now Subscribed!',
  },
  fr: {
    exitEmail: 'Votre e-mail est déjà inscrit!',
    successEmail: 'Vous êtes à présent bien inscrit.',
  },
} as const;

const subjectTitle = {
  en: 'Welcome to our service!',
  fr: 'Bienvenue dans notre service!',
} as const;

const createSubscribe = async (data: TSubscribeFormInput) => {
  const existing = await prisma.subscribe.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    return { alreadyExists: true, email: existing.email };
  }

  const subscribeData = {
    email: data.email,
    created_at: new Date(),
  };

  const subscribe = await prisma.subscribe.create({ data: subscribeData });

  return { alreadyExists: false, email: subscribe.email };
};

const sendEmail = async (
  email: string,
  subject: string,
  locale: 'fr' | 'en'
) => {
  try {
    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject: subjectTitle[locale],
      react: Subscribe({
        subject: subject,
        baseUrl,
        locale,
      }),
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') === 'en' ? 'en' : 'fr';
    if (!request.headers.get('Content-Type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body: unknown = await request.json();

    const parsedData = subscribeSchema().safeParse(body);

    if (!parsedData.success) {
      console.error(parsedData.error.format());
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const result = await createSubscribe(parsedData.data);

    if (result.alreadyExists) {
      await sendEmail(result.email, copy[locale].exitEmail, locale);
    } else {
      await sendEmail(result.email, copy[locale].successEmail, locale);
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
