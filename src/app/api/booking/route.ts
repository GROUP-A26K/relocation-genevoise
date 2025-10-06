import { NextResponse } from "next/server";

import { Env } from "@/libs/Env";
import { executeWithReplication, prisma } from "@/libs/prisma";
import { resend } from "@/libs/resend";
import {
  BookingFormInput,
  bookingSchema,
} from "@/validations/booking.validation";
import CallMeBack from "@/templates/Email/CallMeBack";

const senderEmail = Env.RESEND_EMAIL;
const senderReceiverEmail = Env.RESEND_RECEIVER_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const subjectTitle = {
  en: "Call Me Back",
  fr: "Rappelez-moi",
};

const createBooking = async (data: BookingFormInput) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const recentBooking = await prisma.booking.findFirst({
      where: {
        phone: data.phone,
        created_at: {
          gt: oneHourAgo,
        },
      },
    });

    if (recentBooking) {
      return { booking: recentBooking, isNew: false } as const;
    }

    const bookingData = {
      accept: data.accept,
      phone: data.phone,
      contact_via: data.contactVia,
      created_at: new Date(),
    };

    const { mysql } = await executeWithReplication(
      (client) => client.booking.create({ data: bookingData }),
      (client) => client.booking.create({ data: bookingData })
    );

    return { booking: mysql, isNew: true } as const;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new Error("Failed to create booking");
  }
};

const sendEmail = async (userInfo: BookingFormInput, locale: "fr" | "en") => {
  try {
    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: senderReceiverEmail,
      subject: subjectTitle[locale],
      react: CallMeBack({
        userInfo,
        baseUrl,
        locale,
      }),
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const locale = (url.searchParams.get("locale") === "en" ? "en" : "fr") as
      | "fr"
      | "en";

    if (!request.headers.get("Content-Type")?.includes("application/json")) {
      return NextResponse.json(
        { error: "Content-Type must be application/json" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const parsedData = bookingSchema().safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { booking, isNew } = await createBooking(parsedData.data);

    if (isNew) {
      await sendEmail(parsedData.data, locale);
    }

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
