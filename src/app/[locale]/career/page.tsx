import { PageView } from '@/components/sections/Career';
import { fetchDepartments } from '@/services/career/career.service';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Career',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/blog`,
    },
  };
}
export default async function Page(props: Props) {
  const { locale } = await props.params;

  const { departments } = await fetchDepartments({ locale });

  return <PageView departments={departments} />;
}
