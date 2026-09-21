import * as Sentry from '@sentry/nextjs';

type TApiErrorStep = 'persist' | 'email' | 'captcha' | 'storage' | 'handler';

const describeError = (error: unknown) => {
  if (!(error instanceof Error)) return 'UnknownError';

  const code: unknown = (error as { code?: unknown }).code;

  return typeof code === 'string' ? `${error.name}:${code}` : error.name;
};

export function reportApiError(
  route: string,
  step: TApiErrorStep,
  error: unknown
) {
  const summary = `[api:${route}] ${step} failed (${describeError(error)})`;

  console.error(summary);
  Sentry.captureException(new Error(summary), { tags: { route, step } });
}
