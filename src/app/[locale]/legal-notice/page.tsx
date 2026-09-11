import { getTranslations } from 'next-intl/server';

import { AppConfig } from '@/utils/AppConfig';
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

  const { routes } = AppConfig;

  const canonical =
    routes['LegalNotices'][locale as keyof (typeof routes)['LegalNotices']];

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/${canonical}`,
    },
  };
}
export default function Page() {
  return <PageView />;
}
