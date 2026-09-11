'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { usePathname } from 'next/navigation';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import '@/styles/globals.css';
import { Env } from '@/libs/Env';
import { AppConfig } from '@/utils/AppConfig';
import ErrorPage from '@/components/sections/ErrorPage';

import type { TLocale } from '@/constants/locale';

interface IGlobalErrorProps {
  error: Error & { digest?: string };
}

const MESSAGES: Record<TLocale, AbstractIntlMessages> = {
  fr: {
    Error: {
      500: {
        title: "Quelque chose s'est mal passé !",
        description:
          'Désolé, nous rencontrons des difficultés techniques. Veuillez réessayer plus tard.',
      },
      buttonText: 'Retourner à l’accueil',
    },
  },
  en: {
    Error: {
      500: {
        title: 'Something went wrong!',
        description:
          'Sorry, we’re experiencing technical difficulties. Please try again later',
      },
      buttonText: 'Bring to home',
    },
  },
};

const getLocaleFromPathname = (pathname: string) =>
  (AppConfig.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) ?? AppConfig.defaultLocale) as TLocale;

export default function GlobalError({ error }: IGlobalErrorProps) {
  const locale = getLocaleFromPathname(usePathname());

  useEffect(() => {
    Sentry.captureException(error);

    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
  }, [error]);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider
          locale={locale}
          messages={MESSAGES[locale]}
          timeZone={Env.NEXT_PUBLIC_SERVER_TIMEZONE}
        >
          <ErrorPage errorCode={500} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
