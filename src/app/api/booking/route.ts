import { Env } from '@/libs/Env';
import { prisma } from '@/libs/prisma';
import { resend } from '@/libs/resend';
import CallMeBack from '@/templates/Email/CallMeBack';
import {
  BookingFormInput,
  bookingSchema,
} from '@/validations/booking.validation';
import { NextResponse } from 'next/server';
const senderEmail = Env.RESEND_EMAIL;
const senderReceiverEmail = Env.RESEND_RECEIVER_EMAIL;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;
const createBooking = async (data: BookingFormInput) => {
  return prisma.booking.create({
    data: {
      accept: data.accept,
      phone: data.phone,
      created_at: new Date(),
    },
  });
};

const sendEmail = async (userInfo: BookingFormInput, locale: 'fr' | 'en') => {
  try {
    await resend.emails.send({
      from: senderEmail,
      to: senderReceiverEmail,
      subject: 'Call Me Back',
      react: CallMeBack({
        userInfo,
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

    const parsedData = bookingSchema().safeParse(body);
    if (!parsedData.success) {
      console.log(parsedData.error.format());

      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const newBooking = await createBooking(parsedData.data);

    await sendEmail(parsedData.data, locale);

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
