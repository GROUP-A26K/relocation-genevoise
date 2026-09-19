import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import { PageView } from '@/components/sections/LegalPersonal';
import PageBreadcrumbJsonLd from '@/components/seo/PageBreadcrumbJsonLd';

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
    alternates: getPageAlternates(locale, '/personal-data'),
  };
}

export default async function Page(
  props: PageProps<'/[locale]/personal-data'>
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} trail={['/personal-data']} />

      <PageView />
    </>
  );
}
