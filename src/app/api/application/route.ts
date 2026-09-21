import { randomUUID } from 'node:crypto';

import { Env } from '@/libs/env';
import { prisma } from '@/libs/prisma';
import Application from '@/templates/Email/Application';
import { reportApiError } from '@/libs/api/reportApiError';
import { detectDocumentType } from '@/utils/fileSignature';
import { createLeadHandler, LeadRequestError } from '@/libs/api/leadHandler';
import ApplicationInformation from '@/templates/Email/ApplicationInformation';
import {
  removeFileFromBucket,
  saveFileInBucket,
} from '@/utils/minioFileManagement';
import {
  type TApplicationFormInput,
  applicationSchema,
  MAX_RESUME_FILE_BYTES,
} from '@/validations/application.validation';

const senderEmail = Env.RESEND_EMAIL;
const senderReceiverEmail = Env.RESEND_RECEIVER_EMAIL;
const senderName = Env.RESEND_SENDER_NAME;
const baseUrl = Env.NEXT_PUBLIC_SITE_URL;

const MAX_REQUEST_BYTES = MAX_RESUME_FILE_BYTES + 1024 * 1024;
const MAX_ATTACHMENT_NAME_LENGTH = 100;

const subjectTitle = {
  en: 'Welcome to our company!',
  fr: 'Bienvenue chez notre entreprise!',
} as const;

const applicationInformationSubjectTitle = {
  en: 'Application Submission Received',
  fr: 'Soumission de candidature reçue',
} as const;

type TStoredResume = {
  fileName: string;
  content: Buffer;
  contentType: string;
};

const buildAttachmentName = (originalName: string, extension: string) => {
  const suffix = `.${extension}`;
  const baseName = originalName
    .replace(/\.[^.]*$/, '')
    .replace(/[^A-Za-z0-9._-]/g, '_')
    .slice(0, MAX_ATTACHMENT_NAME_LENGTH - suffix.length);

  return `${baseName || 'resume'}${suffix}`;
};

const mapApplicationBody = (fields: Record<string, unknown>) => {
  const file = fields.resume_file;

  if (file instanceof File && file.size > MAX_RESUME_FILE_BYTES) {
    throw new LeadRequestError('payload_too_large', 413);
  }

  return { ...fields, accept: fields.accept === 'true' };
};

const createApplication = async (
  data: TApplicationFormInput
): Promise<TStoredResume> => {
  const content = Buffer.from(await data.resume_file.arrayBuffer());
  const documentType = detectDocumentType(content);

  if (!documentType || documentType.mimeType !== data.resume_file.type) {
    throw new LeadRequestError('invalid_file', 400);
  }

  const { key } = await saveFileInBucket({
    bucketName: Env.MINIO_BUCKET,
    fileName: `applications/${new Date().getFullYear()}/${randomUUID()}.${documentType.extension}`,
    file: content,
    contentType: documentType.mimeType,
  });

  try {
    await prisma.application.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        accept: data.accept,
        phone: data.phone,
        experience_years: data.experience_years,
        expected_ctc: Number(data.expected_ctc ?? 0),
        resume_url: key,
        department: data.department,
        position: data.position,
        created_at: new Date(),
      },
      select: { id: true },
    });
  } catch (error) {
    await removeFileFromBucket({
      bucketName: Env.MINIO_BUCKET,
      fileName: key,
    }).catch((removeError: unknown) =>
      reportApiError('application', 'storage', removeError)
    );

    throw error;
  }

  return {
    fileName: buildAttachmentName(
      data.resume_file.name,
      documentType.extension
    ),
    content,
    contentType: documentType.mimeType,
  };
};

export const POST = createLeadHandler({
  route: 'application',
  schema: applicationSchema().strict(),
  bodyType: 'multipart',
  maxBodyBytes: MAX_REQUEST_BYTES,
  mapBody: mapApplicationBody,
  persist: createApplication,
  emails: (data, resume, { locale }) => [
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: data.email,
      subject: subjectTitle[locale],
      react: Application({
        username: data.first_name,
        baseUrl,
        locale,
      }),
    },
    {
      from: `"${senderName}" <${senderEmail}>`,
      to: senderReceiverEmail,
      subject: applicationInformationSubjectTitle[locale],
      react: ApplicationInformation({
        userInfo: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          experience_years: data.experience_years,
          expected_ctc: Number(data.expected_ctc ?? 0),
          department: data.department,
          position: data.position,
          resume_file_name: resume.fileName,
        },
        baseUrl,
        locale,
      }),
      attachments: [
        {
          filename: resume.fileName,
          content: resume.content,
          contentType: resume.contentType,
        },
      ],
    },
  ],
});
