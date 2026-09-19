import { HydrationBoundary } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';
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

import { getPageAlternates } from '@/utils/seo';
import Section from '@/components/common/Section';
import { Feature } from '@/components/sections/Home/Feature';
import { HomeHero } from '@/components/sections/Home/HomeHero';
import { StatsGrid } from '@/components/sections/Home/StatsGrid';
import { hydrateBlogFeed } from '@/features/blog/blog.hydration';
import { ContentWithImg } from '@/components/sections/Home/ContentWithImg';
import { ContactFeature } from '@/components/sections/Home/ContactFeature';
import { ServiceFeature } from '@/components/sections/Home/ServiceFeature';
import RelatedBlogsClient from '@/components/sections/Home/RelatedBlogsClient';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';

import type { Metadata } from 'next';
import type { TFeature } from '@/components/sections/Home/ServiceFeature';

export async function generateMetadata(
  props: PageProps<'/[locale]'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Home',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/'),
  };
}

export default async function Page(props: PageProps<'/[locale]'>) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations('HomePage');

  const features: TFeature[] = [
    {
      title: t('ServiceFeature.reasons.0.reasonItems.0.title'),
      icon: SearchSlash,
      link: '/find-accommodation',
    },
    {
      title: t('ServiceFeature.reasons.0.reasonItems.1.title'),
      icon: Building2,
      link: '/find-a-tenant/landlords',
    },
    {
      title: t('ServiceFeature.reasons.0.reasonItems.2.title'),
      icon: Building,
      link: '/companies',
    },
  ];

  const { state, blogList } = await hydrateBlogFeed({
    page: 1,
    pageSize: 3,
    locale,
  });

  return (
    <>
      <Section isDivider revealTrigger="load" className="relative">
        <HomeHero
          heading={t('Hero.heading')}
          subHeading={t('Hero.subHeading')}
          description={t('Hero.description')}
          button={{
            text: t('Hero.buttonText'),
            url: '/call-me-back',
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
          buttonUrl="/contact"
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

      <Section>
        <StatsGrid
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
          buttonUrl="/contact"
          description={[
            {
              paragraph: t('ContentWithImg.description.0.paragraph'),
            },
          ]}
        />
      </Section>

      <Section isDivider>
        <ServiceFeature
          heading={t('ServiceFeature.heading')}
          subHeading={t('ServiceFeature.subHeading')}
          description={t('ServiceFeature.description')}
          features={features}
        />
      </Section>

      <Section isDivider>
        <HydrationBoundary state={state}>
          <RelatedBlogsClient
            locale={locale}
            blogs={blogList.blogs}
            heading={t('BlogList.heading')}
            subHeading={t('BlogList.subHeading')}
            description={t('BlogList.description')}
            buttonText={t('BlogList.buttonText')}
          />
        </HydrationBoundary>
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
