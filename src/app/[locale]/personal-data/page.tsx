import { getTranslations } from 'next-intl/server';

import { getLocalizedPath } from '@/utils/seo';
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

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getLocalizedPath(locale, 'personalData'),
    },
  };
}

export default function Page() {
  return <PageView />;
}
