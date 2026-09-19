import { Env } from '@/libs/env';
import { prisma } from '@/libs/prisma';
import CallMeBack from '@/templates/Email/CallMeBack';
import { createLeadHandler } from '@/libs/api/leadHandler';
import {
  type TBookingFormInput,
  bookingSchema,
} from '@/validations/booking.validation';

const senderEmail = Env.RESEND_EMAIL;
const senderReceiverEmail = Env.RESEND_RECEIVER_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const subjectTitle = {
  en: 'Call Me Back',
  fr: 'Rappelez-moi',
};

const createBooking = async (data: TBookingFormInput) => {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

  const recentBooking = await prisma.booking.findFirst({
    where: {
      phone: data.phone,
      created_at: {
        gt: oneHourAgo,
      },
    },
    select: { id: true },
  });

  if (recentBooking) return null;

  return prisma.booking.create({
    data: {
      accept: data.accept,
      phone: data.phone,
      contact_via: data.contactVia,
      created_at: new Date(),
    },
    select: { id: true },
  });
};

export const POST = createLeadHandler({
  route: 'booking',
  schema: bookingSchema().strict(),
  persist: createBooking,
  emails: (data, _persisted, { locale }) => [
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: senderReceiverEmail,
      subject: subjectTitle[locale],
      react: CallMeBack({
        userInfo: data,
        baseUrl,
        locale,
      }),
    },
  ],
});
