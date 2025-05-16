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
  return prisma.subscribe.create({
    data: {
      email: data.email,
      created_at: new Date(),
    },
  });
};

const sendEmail = async (email: string) => {
  try {
    await resend.emails.send({
      from: senderEmail,
      to: email,
      subject: 'Welcome to our service!',
      html: '<p>Congrats on subscribing!</p>',
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

    const newSubscribe = await createSubscribe(parsedData.data);
    await sendEmail(parsedData.data.email);

    return NextResponse.json(newSubscribe, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
