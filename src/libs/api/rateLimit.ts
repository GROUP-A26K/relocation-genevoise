type TRateLimitOptions = {
  max?: number;
  windowMs?: number;
};

interface IRateLimitResult {
  allowed: boolean;
  retryAfterSeconds: number;
}

const DEFAULT_MAX = 5;
const DEFAULT_WINDOW_MS = 10 * 60 * 1000;
const MAX_TRACKED_KEYS = 10_000;

const hits = new Map<string, number[]>();

const sweep = (now: number, windowMs: number) => {
  hits.forEach((timestamps, key) => {
    if (timestamps.every((timestamp) => now - timestamp >= windowMs)) {
      hits.delete(key);
    }
  });
};

export function rateLimit(
  key: string,
  { max = DEFAULT_MAX, windowMs = DEFAULT_WINDOW_MS }: TRateLimitOptions = {}
): IRateLimitResult {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter(
    (timestamp) => now - timestamp < windowMs
  );

  if (recent.length >= max) {
    hits.set(key, recent);

    const oldest = recent[0] ?? now;

    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((oldest + windowMs - now) / 1000)
      ),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  if (hits.size > MAX_TRACKED_KEYS) sweep(now, windowMs);

  return { allowed: true, retryAfterSeconds: 0 };
}
