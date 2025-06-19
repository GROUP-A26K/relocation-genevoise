import { prisma } from '@/libs/prisma';
import { resend } from '@/libs/resend';
import {
  ContactFormInput,
  contactSchema,
} from '@/validations/contact.validation';
import { NextResponse } from 'next/server';
import { Env } from '@/libs/Env';
import { Contact } from '@/templates/Email/Contact';
import ContactCustomer from '@/templates/Email/ContactCustomer';

const senderEmail = Env.RESEND_EMAIL;
const senderReceiverEmail = Env.RESEND_RECEIVER_EMAIL;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;
const senderName = Env.RESEND_SENDER_NAME;

const subjectTitle = {
  en: 'Welcome to our service!',
  fr: 'Bienvenue dans notre service!',
} as const;

const contactCustomerSubjectTitle = {
  en: 'Contact Form Submission Received',
  fr: 'Formulaire de contact soumis reçu',
} as const;
const createContact = async (data: ContactFormInput) => {
  return prisma.contact.create({
    data: {
      first_name: data.first_name,
      last_name: data.last_name,
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

const sendEmail = async (
  email: string,
  userInfo: ContactFormInput,
  locale: 'fr' | 'en'
) => {
  try {
    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject: subjectTitle[locale],
      react: Contact({
        username: userInfo.first_name,
        baseUrl,
        locale,
      }),
    });

    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: senderReceiverEmail,
      subject: contactCustomerSubjectTitle[locale],
      react: ContactCustomer({
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

    const parsedData = contactSchema().safeParse(body);
    if (!parsedData.success) {
      console.log(parsedData.error.format());

      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const newContact = await createContact(parsedData.data);

    await sendEmail(parsedData.data.email, parsedData.data, locale);

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
