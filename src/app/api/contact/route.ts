import { Env } from '@/libs/env';
import { prisma } from '@/libs/prisma';
import { Contact } from '@/templates/Email/Contact';
import { createLeadHandler } from '@/libs/api/leadHandler';
import ContactCustomer from '@/templates/Email/ContactCustomer';
import { contactSchema } from '@/validations/contact.validation';

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

export const POST = createLeadHandler({
  route: 'contact',
  schema: contactSchema().strict(),
  persist: (data) =>
    prisma.contact.create({
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
      select: { id: true },
    }),
  emails: (data, _persisted, { locale }) => [
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: data.email,
      subject: subjectTitle[locale],
      react: Contact({
        username: data.first_name,
        baseUrl,
        locale,
      }),
    },
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: senderReceiverEmail,
      subject: contactCustomerSubjectTitle[locale],
      react: ContactCustomer({
        userInfo: data,
        baseUrl,
        locale,
      }),
    },
  ],
});
