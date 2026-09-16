import { getTranslations } from 'next-intl/server';

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { Hero } from '@/components/common/Hero/Hero';
import { Content } from '@/components/sections/AnimationContent/Content';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';
import ContentImage3 from '@/assets/images/find-accommodation/steps/analyse-du-marche.webp';
import ContentImage8 from '@/assets/images/find-accommodation/steps/aide-a-l-emmenagement.webp';
import ContentImage4 from '@/assets/images/find-accommodation/steps/propositions-de-biens.webp';
import ContentImage1 from '@/assets/images/find-accommodation/steps/entretien-de-decouverte.webp';
import ContentImage5 from '@/assets/images/find-accommodation/steps/organisation-des-visites.webp';
import ContentImage7 from '@/assets/images/find-accommodation/steps/formalites-administratives.webp';
import ContentImage9 from '@/assets/images/find-accommodation/steps/support-apres-l-installation.webp';
import ContentImage2 from '@/assets/images/find-accommodation/steps/constitution-de-votre-dossier.webp';
import HeroImage from '@/assets/images/find-accommodation/relocation-genevoise-trouver-un-logement.webp';
import ContentImage6 from '@/assets/images/find-accommodation/steps/envoi-et-suivi-de-votre-dossier.webp';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/find-accommodation'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.FindAccommodation',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/find-accommodation'),
  };
}

export default async function Page() {
  const t = await getTranslations('FindAccommodation');

  return (
    <>
      <Section revealTrigger="load" className="relative">
        <Hero
          heroImage={{
            src: HeroImage,
            alt: t('Hero.subHeading'),
            title: t('Hero.subHeading'),
          }}
          heading={t('Hero.heading')}
          subHeading={t('Hero.subHeading')}
          description={t('Hero.description')}
        />
      </Section>

      <Section wrapperProps={{ className: 'pt-0 2xl:pt-0' }}>
        <Content
          items={[
            {
              title: t('Content.items.0.title'),
              description: t('Content.items.0.description'),
              image: ContentImage1,
            },
            {
              title: t('Content.items.1.title'),
              description: t('Content.items.1.description'),
              image: ContentImage2,
            },
            {
              title: t('Content.items.2.title'),
              description: t('Content.items.2.description'),
              image: ContentImage3,
            },
            {
              title: t('Content.items.3.title'),
              description: t('Content.items.3.description'),
              image: ContentImage4,
            },
            {
              title: t('Content.items.4.title'),
              description: t('Content.items.4.description'),
              image: ContentImage5,
            },
            {
              title: t('Content.items.5.title'),
              description: t('Content.items.5.description'),
              image: ContentImage6,
            },
            {
              title: t('Content.items.6.title'),
              description: t('Content.items.6.description'),
              image: ContentImage7,
            },
            {
              title: t('Content.items.7.title'),
              description: t('Content.items.7.description'),
              image: ContentImage8,
            },
            {
              title: t('Content.items.8.title'),
              description: t('Content.items.8.description'),
              image: ContentImage9,
            },
          ]}
        />
      </Section>

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
