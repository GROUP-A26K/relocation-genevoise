import { ApiError } from '@/libs/axios';

import type { BaseSyntheticEvent } from 'react';

export const HONEYPOT_FIELD = 'website';
export const TURNSTILE_FIELD = 'turnstileToken';

const CAPTCHA_FAILED_CODE = 'captcha_failed';

export const isCaptchaError = (error: unknown) =>
  error instanceof ApiError && error.code === CAPTCHA_FAILED_CODE;

export type TFormGuardValues = {
  [HONEYPOT_FIELD]?: string;
  [TURNSTILE_FIELD]?: string;
};

const readField = (formData: FormData, field: string) => {
  const value = formData.get(field);

  return typeof value === 'string' && value !== '' ? value : undefined;
};

export const readFormGuard = (event?: BaseSyntheticEvent): TFormGuardValues => {
  const target: unknown = event?.target;

  if (!(target instanceof HTMLFormElement)) return {};

  const formData = new FormData(target);

  return {
    [HONEYPOT_FIELD]: readField(formData, HONEYPOT_FIELD),
    [TURNSTILE_FIELD]: readField(formData, TURNSTILE_FIELD),
  };
};
