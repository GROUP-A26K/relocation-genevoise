import { Env } from '@/libs/env';
import { createBucketIfNotExists, minio } from '@/libs/minio';

type TSaveParams = {
  bucketName: string;
  fileName: string;
  file: Buffer;
  contentType: string;
};

interface ISaveResult {
  key: string;
}

const DEFAULT_PRESIGNED_EXPIRY_SECONDS = 24 * 60 * 60;

export async function saveFileInBucket({
  bucketName,
  fileName,
  file,
  contentType,
}: TSaveParams): Promise<ISaveResult> {
  await createBucketIfNotExists(bucketName);

  const already = await checkFileExistsInBucket({ bucketName, fileName });
  if (already) throw new Error('File already exists');

  await minio.putObject(bucketName, fileName, file, file.length, {
    'Content-Type': contentType,
    'Content-Disposition': 'attachment',
  });

  return { key: fileName };
}

export function getPresignedUrl(
  key: string,
  expiry = DEFAULT_PRESIGNED_EXPIRY_SECONDS
): Promise<string> {
  return minio.presignedGetObject(Env.MINIO_BUCKET, key, expiry);
}

export function removeFileFromBucket({
  bucketName,
  fileName,
}: {
  bucketName: string;
  fileName: string;
}): Promise<void> {
  return minio.removeObject(bucketName, fileName);
}

/**
 * Check if file exists in bucket
 * @param bucketName name of the bucket
 * @param fileName name of the file
 * @returns true if file exists, false if not
 */
export async function checkFileExistsInBucket({
  bucketName,
  fileName,
}: {
  bucketName: string;
  fileName: string;
}) {
  try {
    await minio.statObject(bucketName, fileName);
  } catch {
    return false;
  }
  return true;
}
