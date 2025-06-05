import { PageView } from '@/components/sections/LegalNotices';
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
    namespace: 'Metadata.MentionsLegales',
  });

  const { routes } = AppConfig;

  const canonical =
    routes['legalNotice'][locale as keyof (typeof routes)['legalNotice']];

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
