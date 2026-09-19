'use client';

import NextError from 'next/error';

import { AppConfig } from '@/utils/appConfig';

export default function NotFound() {
  return (
    <html lang={AppConfig.defaultLocale}>
      <body>
        <NextError statusCode={404} />
      </body>
    </html>
  );
}
