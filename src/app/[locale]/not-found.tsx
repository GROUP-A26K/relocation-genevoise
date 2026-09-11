import { getTranslations } from 'next-intl/server';

import ErrorPage from '@/components/sections/ErrorPage';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata.Error404');

  return {
    title: t('title'),
  };
}

export default function NotFound() {
  return <ErrorPage errorCode={404} />;
}
