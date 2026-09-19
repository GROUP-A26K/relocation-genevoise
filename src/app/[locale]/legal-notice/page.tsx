import { getTranslations } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import { PageView } from '@/components/sections/LegalNotices';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/legal-notice'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.LegalNotices',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/legal-notice'),
  };
}
export default function Page() {
  return <PageView />;
}
