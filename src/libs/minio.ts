import { Client } from 'minio';
import { Env } from './Env';
export const minio = new Client({
  endPoint: Env.MINIO_ENDPOINT,
  port: Number(Env.MINIO_PORT),
  useSSL: true,
  accessKey: Env.MINIO_ACCESS_KEY,
  secretKey: Env.MINIO_SECRET_KEY,
});

export const BUCKET = Env.MINIO_BUCKET;

export async function createBucketIfNotExists(bucketName: string) {
  const bucketExists = await minio.bucketExists(bucketName);
  if (!bucketExists) {
    await minio.makeBucket(bucketName);
  }
}
