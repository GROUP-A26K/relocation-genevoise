import { getTranslations } from 'next-intl/server';

import { AppConfig } from '@/utils/AppConfig';
import { PageView } from '@/components/sections/LegalPersonal';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/personal-data'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.PersonalData',
  });
  const { routes } = AppConfig;

  const canonical =
    routes['personalData'][locale as keyof (typeof routes)['personalData']];

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
