import internal from 'node:stream';
import { createBucketIfNotExists, minio } from '@/libs/minio';
import { Env } from '@/libs/Env';

interface SaveParams {
  bucketName: string;
  fileName: string;
  file: Buffer | internal.Readable;
  /**
   * If `true`, return a presigned URL that expires in `expiry` seconds.
   * If `false`, return a public URL built from MINIO_PUBLIC_ENDPOINT.   */
  signedUrl?: boolean;
  expiry?: number; // seconds, default 1 day
}

interface SaveResult {
  fileName: string;
  url: string;
}

export async function saveFileInBucket({
  bucketName,
  fileName,
  file,
  signedUrl = false,
  expiry = 24 * 60 * 60,
}: SaveParams): Promise<SaveResult> {
  await createBucketIfNotExists(bucketName);

  const already = await checkFileExistsInBucket({ bucketName, fileName });
  if (already) throw new Error('File already exists');

  await minio.putObject(bucketName, fileName, file);

  const url = signedUrl
    ? await minio.presignedGetObject(bucketName, fileName, expiry)
    : `https://${Env.MINIO_ENDPOINT}/${bucketName}/${fileName}`;

  return { fileName, url };
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
