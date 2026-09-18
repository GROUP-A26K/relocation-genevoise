'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { usePathname } from 'next/navigation';
import { type AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';

import '@/styles/globals.css';
import { Env } from '@/libs/env';
import { AppConfig } from '@/utils/appConfig';
import ErrorPage from '@/components/sections/ErrorPage';

import type { TLocale } from '@/utils/appConfig';

interface IGlobalErrorProps {
  error: Error & { digest?: string };
}

const MESSAGES: Record<TLocale, AbstractIntlMessages> = {
  fr: {
    Images: {
      common: {
        error: 'Illustration d’erreur',
      },
    },
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
    Images: {
      common: {
        error: 'Error illustration',
      },
    },
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
  AppConfig.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) ?? AppConfig.defaultLocale;

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
