import { Env } from '@/libs/Env';
import { prisma } from '@/libs/prisma';
import { resend } from '@/libs/resend';
import { Subscribe } from '@/templates/Email/Subscribe';
import {
  SubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';
import { NextResponse } from 'next/server';

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

const createSubscribe = async (data: SubscribeFormInput) => {
  const existing = await prisma.subscribe.findUnique({
    where: { email: data.email },
  });

  if (existing) {
    return { alreadyExists: true, email: existing.email };
  }

  const newSubscribe = await prisma.subscribe.create({
    data: {
      email: data.email,
      created_at: new Date(),
    },
  });

  return { alreadyExists: false, email: newSubscribe.email };
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
    const locale = (url.searchParams.get('locale') === 'en' ? 'en' : 'fr') as
      | 'fr'
      | 'en';
    if (!request.headers.get('Content-Type')?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const parsedData = subscribeSchema().safeParse(body);

    if (!parsedData.success) {
      console.log(parsedData.error.format());
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
