import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/sections/Navigation/NavBar';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages}
      timeZone={Env.NEXT_PUBLIC_SERVER_TIMEZONE}
    >
      <Navbar locale={locale} />
      {props.children}
      <Toaster />
    </NextIntlClientProvider>
  );
}
