import { Env } from '@/libs/env';

const readHost = (value: string | null | undefined) => {
  if (!value) return null;

  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
};

const siteHost = readHost(Env.NEXT_PUBLIC_SITE_URL);

export function isSameOrigin(request: Request): boolean {
  const source =
    request.headers.get('origin') ?? request.headers.get('referer');

  if (!source) return Env.NODE_ENV !== 'production';

  const sourceHost = readHost(source);

  if (!sourceHost) return false;

  const requestHost = request.headers.get('host')?.toLowerCase();

  return sourceHost === siteHost || sourceHost === requestHost;
}

export function getClientIp(request: Request): string | null {
  const cloudflareIp = request.headers.get('cf-connecting-ip')?.trim();

  if (cloudflareIp) return cloudflareIp;

  const forwardedIp = request.headers
    .get('x-forwarded-for')
    ?.split(',')[0]
    ?.trim();

  return forwardedIp || null;
}

export async function readLimitedBody(
  request: Request,
  maxBytes: number
): Promise<Buffer | null> {
  const reader = request.body?.getReader();

  if (!reader) return Buffer.alloc(0);

  const chunks: Uint8Array[] = [];
  let total = 0;

  for (;;) {
    const { done, value } = await reader.read();

    if (done) break;

    total += value.byteLength;

    if (total > maxBytes) {
      await reader.cancel();

      return null;
    }

    chunks.push(value);
  }

  return Buffer.concat(chunks);
}
