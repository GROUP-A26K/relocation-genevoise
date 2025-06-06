import { Hero } from '@/components/blocks/Hero';
import Section from '@/components/customs/Section';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { BookConsultation2 } from '@/components/blocks/Consultation';
import { ContentView } from '@/components/sections/ServiceDetail';
import HeroImage from '@/assets/img/hero/service/scolarite-hero-image.webp';
import { AppConfig } from '@/utils/AppConfig';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.AcademicService',
  });

  const { routes } = AppConfig;

  const canonical =
    routes['academicService'][
      locale as keyof (typeof routes)['academicService']
    ];

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}/${canonical}`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Education',
  });

  return (
    <>
      <Section className="relative">
        <Hero
          heroImage={{
            src: HeroImage.src,
            alt: t('heading'),
            title: t('heading'),
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
      <Section className="lg:bg-white bg-grey-50">
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
