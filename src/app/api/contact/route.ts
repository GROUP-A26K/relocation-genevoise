import { prisma } from '@/libs/prisma';
import { resend } from '@/libs/resend';
import {
  ContactFormInput,
  contactSchema,
} from '@/validations/contact.validation';
import { NextResponse } from 'next/server';
import { Env } from '@/libs/Env';

const senderEmail = Env.RESEND_EMAIL;
const createContact = async (data: ContactFormInput) => {
  return prisma.contact.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
      email: data.email,
      subject: data.subject,
      message: data.message,
      accept: data.accept,
      phone: data.phone,
      company: data.company,
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
      html: '<p>Congrats on sending your information!</p>',
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

    const parsedData = contactSchema().safeParse(body);
    if (!parsedData.success) {
      console.log(parsedData.error.format());

      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const newContact = await createContact(parsedData.data);

    await sendEmail(parsedData.data.email);

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
