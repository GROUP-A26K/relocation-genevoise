import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/[...pageNotFound]'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Error404' });

  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: true },
  };
}

export default function PageNotFound() {
  notFound();
}
