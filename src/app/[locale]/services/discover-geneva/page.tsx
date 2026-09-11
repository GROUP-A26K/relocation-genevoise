import { getTranslations } from 'next-intl/server';

import { getLocalizedPath } from '@/utils/seo';
import { Hero } from '@/components/blocks/Hero';
import Section from '@/components/customs/Section';
import { ContentView } from '@/components/sections/ServiceDetail';
import { BookConsultation2 } from '@/components/blocks/Consultation';
import HeroImage from '@/assets/img/hero/service/decouvrir-geneve-hero-image.webp';

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
    alternates: {
      canonical: getLocalizedPath(locale, 'discoverGenevaService'),
    },
  };
}

export default async function Page() {
  const t = await getTranslations('DiscoverGeneva');

  return (
    <>
      <Section revealTrigger="load" className="relative">
        <Hero
          heroImage={{
            src: HeroImage.src,
            alt: t('subHeading'),
            title: t('subHeading'),
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
      <Section className="bg-grey-50 lg:bg-white">
        <BookConsultation2
          heading={t('BookConsultation.heading')}
          subHeading={t('BookConsultation.subHeading')}
          description={t('BookConsultation.description')}
          buttonText1={t('BookConsultation.buttonText1')}
          buttonText2={t('BookConsultation.buttonText2')}
        />
      </Section>
    </>
  );
}
