export const dynamic = 'force-dynamic';
import { HomeHero } from '@/components/blocks/Hero';
import Section from '@/components/customs/Section';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import {
  ContactFeature,
  Feature,
  ServiceFeature2,
} from '@/components/blocks/Feature';
import {
  Building,
  Building2,
  Clover,
  Grid2x2Plus,
  HeartHandshake,
  House,
  Lightbulb,
  ScanEye,
  Search,
  SearchSlash,
  UsersRound,
} from 'lucide-react';
import { StatsGrid2 } from '@/components/blocks/Stats';
import { ContentWithImg } from '@/components/blocks/Content';
import { BookConsultation2 } from '@/components/blocks/Consultation';
// import { Logos } from '@/components/blocks/Logos';
import { fetchBlogs } from '@/services/blog.service';
import { BlogList } from '@/components/blocks/Blog';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Home',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale == 'fr' ? '' : locale}`,
    },
  };
}

export default async function Page(props: Props) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'HomePage',
  });

  const features = [
    {
      title: t('ServiceFeature.reasons.0.reasonItems.0.title'),
      icon: SearchSlash,
      link: '/find-accommodation',
    },
    {
      title: t('ServiceFeature.reasons.0.reasonItems.1.title'),
      icon: Building2,
      link: '/find-a-tenant',
    },
    {
      title: t('ServiceFeature.reasons.0.reasonItems.2.title'),
      icon: Building,
      link: '/companies',
    },
  ];

  const { blogs } = await fetchBlogs({ page: 1, pageSize: 3, locale: locale });

  return (
    <>
      <Section isDivider className="relative">
        <HomeHero
          heading={t('Hero.heading')}
          subHeading={t('Hero.subHeading')}
          description={t('Hero.description')}
          button={{
            text: t('Hero.buttonText'),
            url: '/rappelez-moi',
          }}
          button2={{
            text: t('Hero.buttonText2'),
            url: '/contact',
          }}
        />
      </Section>

      <Section>
        <ContactFeature
          heading={t('ContactFeature.heading')}
          subHeading={t('ContactFeature.subHeading')}
          description={t('ContactFeature.description')}
          buttonText={t('ContactFeature.buttonText')}
          buttonUrl={'/contact'}
          reasonItems={[
            {
              title: t('ContactFeature.reasonItems.0.title'),
              description: t('ContactFeature.reasonItems.0.description'),
              icon: Search,
            },
            {
              title: t('ContactFeature.reasonItems.1.title'),
              description: t('ContactFeature.reasonItems.1.description'),
              icon: House,
            },
            {
              title: t('ContactFeature.reasonItems.2.title'),
              description: t('ContactFeature.reasonItems.2.description'),
              icon: UsersRound,
            },
            {
              title: t('ContactFeature.reasonItems.3.title'),
              description: t('ContactFeature.reasonItems.3.description'),
              icon: Grid2x2Plus,
            },
          ]}
        />
      </Section>

      {/* <Logos heading={t('Logos.heading')} /> */}

      <Section>
        <StatsGrid2
          heading={t('StatsGrid.heading')}
          subHeading={t('StatsGrid.subHeading')}
          description={t('StatsGrid.description')}
          stats1={{
            value: t('StatsGrid.start1.value'),
            label: t('StatsGrid.start1.label'),
          }}
          stats2={{
            value: t('StatsGrid.start2.value'),
            label: t('StatsGrid.start2.label'),
          }}
          stats3={{
            value: t('StatsGrid.start3.value'),
            label: t('StatsGrid.start3.label'),
          }}
          stats4={{
            value: t('StatsGrid.start4.value'),
            label: t('StatsGrid.start4.label'),
          }}
        />
      </Section>

      <Section className="bg-grey-50">
        <Feature
          heading={t('EngagementFeature.heading')}
          subHeading={t('EngagementFeature.subHeading')}
          description={t('EngagementFeature.description')}
          reasonItems={[
            {
              title: t('EngagementFeature.reasonItems.0.title'),
              description: t('EngagementFeature.reasonItems.0.description'),
              icon: HeartHandshake,
            },
            {
              title: t('EngagementFeature.reasonItems.1.title'),
              description: t('EngagementFeature.reasonItems.1.description'),
              icon: Lightbulb,
            },
            {
              title: t('EngagementFeature.reasonItems.2.title'),
              description: t('EngagementFeature.reasonItems.2.description'),
              icon: ScanEye,
            },
            {
              title: t('EngagementFeature.reasonItems.3.title'),
              description: t('EngagementFeature.reasonItems.3.description'),
              icon: Clover,
            },
          ]}
        />
      </Section>

      <Section isDivider>
        <ContentWithImg
          heading={t('ContentWithImg.heading')}
          subHeading={t('ContentWithImg.subHeading')}
          buttonText={t('ContentWithImg.buttonText')}
          buttonUrl={'/contact'}
          description={[
            {
              paragraph: t('ContentWithImg.description.0.paragraph'),
            },
          ]}
        />
      </Section>

      <Section isDivider>
        <ServiceFeature2
          heading={t('ServiceFeature.heading')}
          subHeading={t('ServiceFeature.subHeading')}
          description={t('ServiceFeature.description')}
          features={features}
        />
      </Section>

      <Section isDivider>
        <BlogList
          blogs={blogs}
          heading={t('BlogList.heading')}
          subHeading={t('BlogList.subHeading')}
          description={t('BlogList.description')}
          buttonText={t('BlogList.buttonText')}
          buttonUrl={'/blog'}
        />
      </Section>

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
