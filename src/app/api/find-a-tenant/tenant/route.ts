import { NextResponse } from "next/server";

import { Env } from "@/libs/Env";
import { resend } from "@/libs/resend";
import { executeWithReplication } from "@/libs/prisma";
import { tenantFormSchema } from "@/validations/findATenant.validation";
import { FindATenantInquiry } from "@/templates/Email/FindATenantInquiry";
import { FindATenantCustomer } from "@/templates/Email/FindATenantCustomer";

const senderEmail = Env.RESEND_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const receiverEmail = Env.RESEND_RECEIVER_EMAIL;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const subjectTitle = {
  en: "New tenant inquiry",
  fr: "Nouvelle demande locataire",
} as const;

const customerSubjectTitle = {
  en: "We received your inquiry",
  fr: "Nous avons bien reçu votre demande",
} as const;

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const locale = url.searchParams.get("locale") === "en" ? "en" : "fr";

    if (!request.headers.get("Content-Type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const parsedData = tenantFormSchema().safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 },
      );
    }

    const data = parsedData.data;

    const { mysql } = await executeWithReplication((client) =>
      client.tenant_inquiry.create({
        data: {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone,
          property_address: data.property_address,
          property_type: data.property_type,
          number_of_rooms: data.number_of_rooms,
          accept: data.accept,
          created_at: new Date(),
        },
      }),
    );

    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: data.email,
      subject: customerSubjectTitle[locale],
      react: FindATenantCustomer({ username: data.full_name, baseUrl, locale }),
    });

    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: receiverEmail,
      subject: subjectTitle[locale],
      react: FindATenantInquiry({
        audience: "tenant",
        userInfo: data,
        baseUrl,
        locale,
      }),
    });

    return NextResponse.json(mysql, { status: 201 });
  } catch (error) {
    console.error("Error creating tenant inquiry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
