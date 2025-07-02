import { Hero } from '@/components/blocks/Hero';
import Section from '@/components/customs/Section';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { ContentView } from '@/components/sections/AnimationContent';
import { BookConsultation2 } from '@/components/blocks/Consultation';
import HeroImage from '@/assets/img/bg/relocation-genevoise-trouver-un-iogement.webp';
import ContentImage1 from '@/assets/img/bg/trouver-un-logement/entretien-de-decouverte.webp';
import ContentImage2 from '@/assets/img/bg/trouver-un-logement/constitution-de-votre-dossier.webp';
import ContentImage3 from '@/assets/img/bg/trouver-un-logement/analyse-du-marche.webp';
import ContentImage4 from '@/assets/img/bg/trouver-un-logement/propositions-de-biens.webp';
import ContentImage5 from '@/assets/img/bg/trouver-un-logement/organisation-des-visites.webp';
import ContentImage6 from '@/assets/img/bg/trouver-un-logement/envoi-et-suivi-de-votre-dossier.webp';
import ContentImage7 from '@/assets/img/bg/trouver-un-logement/formalites-administratives.webp';
import ContentImage8 from '@/assets/img/bg/trouver-un-logement/aide-a-lemmenagement.webp';
import ContentImage9 from '@/assets/img/bg/trouver-un-logement/support-apres-linstallation.webp';
import { AppConfig } from '@/utils/AppConfig';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.FindAccommodation',
  });
  const { routes } = AppConfig;

  const canonical =
    routes['findAccommodation'][
      locale as keyof (typeof routes)['findAccommodation']
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
    namespace: 'FindAccommodation',
  });

  return (
    <>
      <Section className="relative">
        <Hero
          heroImage={{
            src: HeroImage.src,
            alt: t('Hero.subHeading'),
            title: t('Hero.subHeading'),
          }}
          heading={t('Hero.heading')}
          subHeading={t('Hero.subHeading')}
          description={t('Hero.description')}
        />
      </Section>

      <ContentView
        items={[
          {
            title: t('Content.items.0.title'),
            description: t('Content.items.0.description'),
            image: ContentImage1.src,
          },
          {
            title: t('Content.items.1.title'),
            description: t('Content.items.1.description'),
            image: ContentImage2.src,
          },
          {
            title: t('Content.items.2.title'),
            description: t('Content.items.2.description'),
            image: ContentImage3.src,
          },
          {
            title: t('Content.items.3.title'),
            description: t('Content.items.3.description'),
            image: ContentImage4.src,
          },
          {
            title: t('Content.items.4.title'),
            description: t('Content.items.4.description'),
            image: ContentImage5.src,
          },
          {
            title: t('Content.items.5.title'),
            description: t('Content.items.5.description'),
            image: ContentImage6.src,
          },
          {
            title: t('Content.items.6.title'),
            description: t('Content.items.6.description'),
            image: ContentImage7.src,
          },
          {
            title: t('Content.items.7.title'),
            description: t('Content.items.7.description'),
            image: ContentImage8.src,
          },
          {
            title: t('Content.items.8.title'),
            description: t('Content.items.8.description'),
            image: ContentImage9.src,
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
