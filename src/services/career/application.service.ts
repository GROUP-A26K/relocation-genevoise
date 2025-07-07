import { randomUUID } from 'crypto';
import { prisma } from '@/libs/prisma';
import { minio } from '@/libs/minio';
import { BUCKET } from '@/libs/minio';

import { ApplicationFormInput } from '@/validations/application.validation';

export async function putInMinio(
  stream: NodeJS.ReadableStream,
  originalName: string
) {
  const key = `resumes/${randomUUID()}-${originalName}`;
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  const buffer = Buffer.concat(chunks);
  await minio.putObject(BUCKET, key, buffer, buffer.length);
  const url = await minio.presignedGetObject(BUCKET, key, 60 * 60 * 24 * 7);
  return { key, url };
}

export async function createApplication(
  data: Omit<ApplicationFormInput, 'resume_file'> & { resume_url: string }
) {
  return prisma.application.create({
    data: {
      ...data,
      created_at: new Date(),
      department: data.department ?? 'Unknown',
      position: data.position ?? 'Unknown',
    },
  });
}
