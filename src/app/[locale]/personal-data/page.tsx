import { PageView } from '@/components/sections/LegalPersonal';
import { AppConfig } from '@/utils/AppConfig';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.DonnesPersonnelles',
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

export default async function Page() {
  return <PageView />;
}
