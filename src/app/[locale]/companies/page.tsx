import { CompaniesInfo } from '@/components/blocks/Info';
import Section from '@/components/customs/Section';
import { AppConfig } from '@/utils/AppConfig';
import {
  Focus,
  Coins,
  SquareUserRound,
  Cog,
  SearchSlash,
  Dumbbell,
  Building,
  Heart,
  Smile,
  School,
  Paintbrush,
  ContactRound,
  UsersRound,
  Videotape,
  Package2,
} from 'lucide-react';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Companies',
  });

  const { routes } = AppConfig;

  const canonical =
    routes['companies'][locale as keyof (typeof routes)['companies']];

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
    namespace: 'Companies',
  });
  return (
    <>
      <Section>
        <CompaniesInfo
          heading={t('BusinessInfo.heading')}
          subHeading={t('BusinessInfo.subHeading')}
          description={t('BusinessInfo.description')}
          items={[
            {
              title: t('BusinessInfo.items.0.title'),
              subItems: [
                {
                  title: t('BusinessInfo.items.0.subItems.0.title'),
                  description: t('BusinessInfo.items.0.subItems.0.description'),
                  icon: Focus,
                },
                {
                  title: t('BusinessInfo.items.0.subItems.1.title'),
                  description: t('BusinessInfo.items.0.subItems.1.description'),
                  icon: Coins,
                },
                {
                  title: t('BusinessInfo.items.0.subItems.2.title'),
                  description: t('BusinessInfo.items.0.subItems.2.description'),
                  icon: SearchSlash,
                },
              ],
            },
            {
              title: t('BusinessInfo.items.1.title'),
              subItems: [
                {
                  title: t('BusinessInfo.items.1.subItems.0.title'),
                  description: t('BusinessInfo.items.1.subItems.0.description'),
                  icon: SquareUserRound,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.1.title'),
                  description: t('BusinessInfo.items.1.subItems.1.description'),
                  icon: Cog,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.2.title'),
                  description: t('BusinessInfo.items.1.subItems.2.description'),
                  icon: Paintbrush,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.3.title'),
                  description: t('BusinessInfo.items.1.subItems.3.description'),
                  icon: Dumbbell,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.4.title'),
                  description: t('BusinessInfo.items.1.subItems.4.description'),
                  icon: ContactRound,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.5.title'),
                  description: t('BusinessInfo.items.1.subItems.5.description'),
                  icon: UsersRound,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.6.title'),
                  description: t('BusinessInfo.items.1.subItems.6.description'),
                  icon: Videotape,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.7.title'),
                  description: t('BusinessInfo.items.1.subItems.7.description'),
                  icon: Package2,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.8.title'),
                  description: t('BusinessInfo.items.1.subItems.8.description'),
                  icon: Building,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.9.title'),
                  description: t('BusinessInfo.items.1.subItems.9.description'),
                  icon: Heart,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.10.title'),
                  description: t(
                    'BusinessInfo.items.1.subItems.10.description'
                  ),
                  icon: Smile,
                },
                {
                  title: t('BusinessInfo.items.1.subItems.11.title'),
                  description: t(
                    'BusinessInfo.items.1.subItems.11.description'
                  ),
                  icon: School,
                },
              ],
            },
          ]}
        />
      </Section>
    </>
  );
}
