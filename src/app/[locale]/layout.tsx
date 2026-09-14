import Script from 'next/script';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import NextTopLoader from 'nextjs-toploader';
import { NextIntlClientProvider } from 'next-intl';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { GoogleTagManager } from '@next/third-parties/google';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';

import '@/styles/globals.css';
import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import { Toaster } from '@/components/ui/sonner';
import SiteJsonLd from '@/components/seo/SiteJsonLd';
import { getOgLocale, getSiteUrl } from '@/utils/seo';
import { OG_IMAGE, SITE_NAME } from '@/constants/seo';
import { Navbar } from '@/components/sections/Navigation/NavBar';

import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const PREVIEW_IMAGE = {
  url: OG_IMAGE.path,
  width: OG_IMAGE.width,
  height: OG_IMAGE.height,
  alt: OG_IMAGE.alt,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<'/[locale]'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Home' });

  return {
    metadataBase: new URL(getSiteUrl()),
    title: t('title'),
    description: t('description'),
    applicationName: SITE_NAME,
    manifest: '/site.webmanifest',
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
        {
          url: '/android-chrome-192x192.png',
          type: 'image/png',
          sizes: '192x192',
        },
      ],
      apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    },
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: getOgLocale(locale),
      images: [PREVIEW_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      images: [PREVIEW_IMAGE],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} scroll-smooth`}
    >
      <head>
        <Script
          id="cookieyes"
          src="https://cdn-cookieyes.com/client_data/9a39582ed0c78f02105a4fb9/script.js"
          strategy="beforeInteractive"
        />
      </head>
      {Env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={Env.NEXT_PUBLIC_GTM_ID} />
      )}

      <body>
        <SiteJsonLd locale={locale} />
        <NuqsAdapter>
          <NextIntlClientProvider
            locale={locale}
            messages={messages}
            timeZone={Env.NEXT_PUBLIC_SERVER_TIMEZONE}
          >
            <Navbar locale={locale} />
            <NextTopLoader color="#f7d913" showSpinner={false} height={1} />
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
