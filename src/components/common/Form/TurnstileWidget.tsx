'use client';

import Script from 'next/script';
import { useLocale } from 'next-intl';
import { useFormState } from 'react-hook-form';
import { useCallback, useEffect, useRef } from 'react';

import { TURNSTILE_FIELD } from '@/utils/formGuard';

const TURNSTILE_SCRIPT_URL =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type TTurnstileApi = {
  render: (container: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TTurnstileApi;
  }
}

interface ITurnstileWidgetProps {
  siteKey: string;
  className?: string;
}

export const TurnstileWidget: React.FC<ITurnstileWidgetProps> = ({
  siteKey,
  className,
}) => {
  const locale = useLocale();
  const { isSubmitting, errors } = useFormState();
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const wasSubmittingRef = useRef(false);
  const hasErrors = Object.keys(errors).length > 0;

  const renderWidget = useCallback(() => {
    if (!containerRef.current || widgetIdRef.current || !window.turnstile) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey,
      language: locale,
      size: 'flexible',
      appearance: 'interaction-only',
      'response-field-name': TURNSTILE_FIELD,
    });
  }, [locale, siteKey]);

  useEffect(
    () => () => {
      if (widgetIdRef.current) {
        window.turnstile?.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    const hasFinishedSubmitting = wasSubmittingRef.current && !isSubmitting;

    wasSubmittingRef.current = isSubmitting;

    if (hasFinishedSubmitting && !hasErrors && widgetIdRef.current) {
      window.turnstile?.reset(widgetIdRef.current);
    }
  }, [hasErrors, isSubmitting]);

  return (
    <>
      <Script
        src={TURNSTILE_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={renderWidget}
        onReady={renderWidget}
      />
      <div ref={containerRef} className={className} />
    </>
  );
};
