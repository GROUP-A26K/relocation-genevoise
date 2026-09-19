import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { Hero } from '@/components/common/Hero/Hero';
import { ContentView } from '@/components/sections/ServiceDetail';
import HeroImage from '@/assets/images/services/service-de-conciergerie-hero.webp';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/services/concierge-service'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ConciergeService',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/services/concierge-service'),
  };
}

export default async function Page(
  props: PageProps<'/[locale]/services/concierge-service'>
) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations('ConciergeService');
  const imageT = await getTranslations('Images');

  return (
    <>
      <Section revealTrigger="load" className="relative">
        <Hero
          heroImage={{
            src: HeroImage,
            alt: imageT('services.concierge'),
            title: imageT('services.concierge'),
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
