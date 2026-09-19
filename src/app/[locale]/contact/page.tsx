import { Mail, MapPin, Phone } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { ContactFormView } from '@/components/sections/Contact';
import { ContactInfo } from '@/components/common/Info/ContactInfo';
import PageBreadcrumbJsonLd from '@/components/seo/PageBreadcrumbJsonLd';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/contact'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Contact',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/contact'),
  };
}
export default async function Page(props: PageProps<'/[locale]/contact'>) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('Contact');

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} trail={['/contact']} />

      <Section revealTrigger="load">
        <ContactInfo
          heading={t('ContactInfo.heading')}
          subHeading={t('ContactInfo.subHeading')}
          description={t('ContactInfo.description')}
          reasonItems={[
            {
              title: t('ContactInfo.reasonItems.0.title'),
              description: t('ContactInfo.reasonItems.0.description'),
              info: t('ContactInfo.reasonItems.0.info'),
              icon: Mail,
            },
            {
              title: t('ContactInfo.reasonItems.1.title'),
              description: t('ContactInfo.reasonItems.1.description'),
              info: t('ContactInfo.reasonItems.1.info'),
              icon: MapPin,
            },
            {
              title: t('ContactInfo.reasonItems.2.title'),
              description: t('ContactInfo.reasonItems.2.description'),
              info: t('ContactInfo.reasonItems.2.info'),
              icon: Phone,
            },
          ]}
        />
      </Section>
      <ContactFormView />
    </>
  );
}
