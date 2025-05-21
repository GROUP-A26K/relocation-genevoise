import { Env } from '@/libs/Env';
import { prisma } from '@/libs/prisma';
import { resend } from '@/libs/resend';
import {
  SubscribeFormInput,
  subscribeSchema,
} from '@/validations/subscribe.validation';
import { NextResponse } from 'next/server';

const senderEmail = Env.RESEND_EMAIL;

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

const sendEmail = async (email: string, subject: string) => {
  try {
    await resend.emails.send({
      from: senderEmail,
      to: email,
      subject: 'Welcome to our service!',
      html: `<p>${subject}</p>`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export async function POST(request: Request) {
  try {
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
      await sendEmail(result.email, 'Your email is already subscribed.');
    } else {
      await sendEmail(result.email, 'Congrats on sending your information!');
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
