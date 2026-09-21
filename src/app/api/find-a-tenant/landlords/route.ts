import { Env } from '@/libs/env';
import { prisma } from '@/libs/prisma';
import { createLeadHandler } from '@/libs/api/leadHandler';
import { FindATenantInquiry } from '@/templates/Email/FindATenantInquiry';
import { landlordsFormSchema } from '@/validations/findATenant.validation';
import { FindATenantCustomer } from '@/templates/Email/FindATenantCustomer';

const senderEmail = Env.RESEND_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const receiverEmail = Env.RESEND_RECEIVER_EMAIL;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const subjectTitle = {
  en: 'New landlord inquiry',
  fr: 'Nouvelle demande propriétaire',
} as const;

const customerSubjectTitle = {
  en: 'We received your inquiry',
  fr: 'Nous avons bien reçu votre demande',
} as const;

export const POST = createLeadHandler({
  route: 'find-a-tenant/landlords',
  schema: landlordsFormSchema().strict(),
  persist: (data) =>
    prisma.landlord_inquiry.create({
      data: {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        property_address: data.property_address,
        property_type: data.property_type,
        number_of_rooms: data.number_of_rooms,
        additional_info: data.additional_info ?? null,
        accept: data.accept,
        created_at: new Date(),
      },
      select: { id: true },
    }),
  emails: (data, _persisted, { locale }) => [
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: data.email,
      subject: customerSubjectTitle[locale],
      react: FindATenantCustomer({ username: data.full_name, baseUrl, locale }),
    },
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: receiverEmail,
      subject: subjectTitle[locale],
      react: FindATenantInquiry({
        audience: 'landlord',
        userInfo: data,
        baseUrl,
        locale,
      }),
    },
  ],
});
