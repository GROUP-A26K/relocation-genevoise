import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { Hero } from '@/components/common/Hero/Hero';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import { ContentView } from '@/components/sections/ServiceDetail';
import HeroImage from '@/assets/images/services/scolarite-hero.webp';
import PageBreadcrumbJsonLd from '@/components/seo/PageBreadcrumbJsonLd';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/services/academic'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.AcademicService',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/services/academic'),
  };
}

export default async function Page(
  props: PageProps<'/[locale]/services/academic'>
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('Education');
  const imageT = await getTranslations('Images');

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} trail={['/services/academic']} />

      <ServiceJsonLd service="academic" locale={locale} />

      <Section revealTrigger="load" className="relative">
        <Hero
          heroImage={{
            src: HeroImage,
            alt: imageT('services.academic'),
            title: imageT('services.academic'),
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
            paragraphType: 'descriptive',

            content: [
              {
                title: t('sections.1.content.0.title'),
                paragraph: t('sections.1.content.0.paragraph'),
              },
              {
                title: t('sections.1.content.1.title'),
                paragraph: t('sections.1.content.1.paragraph'),
              },
              {
                title: t('sections.1.content.2.title'),
                paragraph: t('sections.1.content.2.paragraph'),
              },
              {
                title: t('sections.1.content.3.title'),
                paragraph: t('sections.1.content.3.paragraph'),
              },
              {
                title: t('sections.1.content.4.title'),
                paragraph: t('sections.1.content.4.paragraph'),
              },
              {
                title: t('sections.1.content.5.title'),
                paragraph: t('sections.1.content.5.paragraph'),
              },
            ],
          },
          {
            paragraphType: 'introductory',
            content: [
              {
                paragraph: t('sections.2.content.0.paragraph'),
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
