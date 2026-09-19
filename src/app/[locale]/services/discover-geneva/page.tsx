import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { Hero } from '@/components/common/Hero/Hero';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import { ContentView } from '@/components/sections/ServiceDetail';
import PageBreadcrumbJsonLd from '@/components/seo/PageBreadcrumbJsonLd';
import HeroImage from '@/assets/images/services/decouvrir-geneve-hero.webp';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/services/discover-geneva'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.DiscoverGeneva',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/services/discover-geneva'),
  };
}

export default async function Page(
  props: PageProps<'/[locale]/services/discover-geneva'>
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('DiscoverGeneva');
  const imageT = await getTranslations('Images');

  return (
    <>
      <PageBreadcrumbJsonLd
        locale={locale}
        trail={['/services/discover-geneva']}
      />

      <ServiceJsonLd service="discoverGeneva" locale={locale} />

      <Section revealTrigger="load" className="relative">
        <Hero
          heroImage={{
            src: HeroImage,
            alt: imageT('services.discover'),
            title: imageT('services.discover'),
          }}
          heading={t('heading')}
          subHeading={t('subHeading')}
          description={t('description')}
        />
      </Section>
      <ContentView
        section={[
          {
            paragraphType: 'introductory',
            content: [
              {
                paragraph: t('sections.0.content.0.paragraph'),
              },
            ],
          },
          {
            paragraphType: 'introductory',
            content: [
              {
                paragraph: t('sections.1.content.0.paragraph'),
              },
            ],
          },
          {
            paragraphType: 'descriptive',
            content: [
              {
                title: t('sections.2.content.0.title'),
                paragraph: t('sections.2.content.0.paragraph'),
              },
              {
                title: t('sections.2.content.1.title'),
                paragraph: t('sections.2.content.1.paragraph'),
              },
              {
                title: t('sections.2.content.2.title'),
                paragraph: t('sections.2.content.2.paragraph'),
              },
              {
                title: t('sections.2.content.3.title'),
                paragraph: t('sections.2.content.3.paragraph'),
              },
              {
                title: t('sections.2.content.4.title'),
                paragraph: t('sections.2.content.4.paragraph'),
              },
            ],
          },
        ]}
      />
      <BookConsultation
        heading={t('BookConsultation.heading')}
        subHeading={t('BookConsultation.subHeading')}
        description={t('BookConsultation.description')}
        buttonText1={t('BookConsultation.buttonText1')}
        buttonText2={t('BookConsultation.buttonText2')}
      />
    </>
  );
}
