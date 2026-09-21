'use client';

import { Env } from '@/libs/env';
import { HONEYPOT_FIELD } from '@/utils/formGuard';

import { TurnstileWidget } from './TurnstileWidget';

interface IFormGuardProps {
  className?: string;
}

export const FormGuard: React.FC<IFormGuardProps> = ({ className }) => {
  const siteKey = Env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <>
      <input
        type="text"
        name={HONEYPOT_FIELD}
        defaultValue=""
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />
      {siteKey && <TurnstileWidget siteKey={siteKey} className={className} />}
    </>
  );
};
