import { Env } from "@/libs/Env";
import { saveFileInBucket } from "@/utils/minio-file-management";
import {
  ApplicationFormInput,
  applicationSchema,
} from "@/validations/application.validation";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import ApplicationInformation from "@/templates/Email/ApplicationInformation";
import Application from "@/templates/Email/Application";
import { resend } from "@/libs/resend";
import { executeWithReplication } from "@/libs/prisma";
const senderEmail = Env.RESEND_EMAIL;
const senderReceiverEmail = Env.RESEND_RECEIVER_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const subjectTitle = {
  en: "Welcome to our company!",
  fr: "Bienvenue chez notre entreprise!",
} as const;

const applicationInformationSubjectTitle = {
  en: "Application Submission Received",
  fr: "Soumission de candidature reçue",
} as const;

interface UserInfo
  extends Omit<
    ApplicationFormInput,
    "resume_file " | "accept " | "expected_ctc"
  > {
  resume_url: string;
  expected_ctc: number | undefined;
}

const sendEmail = async (
  email: string,
  userInfo: UserInfo,
  locale: "fr" | "en"
) => {
  try {
    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: email,
      subject: subjectTitle[locale],
      react: Application({
        username: userInfo.first_name,
        baseUrl,
        locale,
      }),
    });

    await resend.emails.send({
      from: `"${senderName}" <${senderEmail}>`,
      to: senderReceiverEmail,
      subject: applicationInformationSubjectTitle[locale],
      react: ApplicationInformation({
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

const getString = (fd: FormData, key: string, fallback = "") =>
  typeof fd.get(key) === "string" ? (fd.get(key) as string) : fallback;

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const locale = (url.searchParams.get("locale") === "en" ? "en" : "fr") as
      | "fr"
      | "en";

    if (!request.headers.get("content-type")?.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Content-Type must be multipart/form-data" },
        { status: 400 }
      );
    }

    const formData = await request.formData();

    const data = {
      first_name: getString(formData, "first_name"),
      last_name: getString(formData, "last_name"),
      email: getString(formData, "email"),
      phone: getString(formData, "phone"),
      experience_years: getString(formData, "experience_years"),
      expected_ctc: Number(getString(formData, "expected_ctc", "0")),
      accept: getString(formData, "accept") === "true",
      resume_file: formData.get("resume_file") as File,
      department: getString(formData, "department"),
      position: getString(formData, "position"),
    };

    const parsed = applicationSchema()
      .omit({ expected_ctc: true })
      .safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await data.resume_file.arrayBuffer());
    const fileName = `${nanoid(5)}-${data.resume_file.name}`;

    const file = await saveFileInBucket({
      bucketName: Env.MINIO_BUCKET,
      fileName,
      file: buffer,
      signedUrl: false,
    });

    const applicationData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      accept: data.accept,
      phone: data.phone,
      experience_years: data.experience_years,
      expected_ctc: data.expected_ctc,
      resume_url: file.url,
      department: data.department,
      position: data.position,
      created_at: new Date(),
    };

    await executeWithReplication(
      (client) => client.application.create({ data: applicationData }),
      (client) => client.application.create({ data: applicationData }),
      {
        rollback: async (client, mysqlResult) => {
          await client.application.delete({ where: { id: mysqlResult.id } });
        },
      }
    );

    await sendEmail(data.email, { ...data, resume_url: file.url }, locale);

    return NextResponse.json(
      { status: "ok", message: "Files were uploaded successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { status: "fail", message: "Upload error" },
      { status: 500 }
    );
  }
}
