import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { getLocalizedPath } from '@/utils/seo';
import { RevealSection } from '@/components/customs/Reveal';
import { BookConsultation2 } from '@/components/blocks/Consultation';
import { ExchangeRatesProvider } from '@/context/ExchangeRatesContext';
import PropertiesHero from '@/components/sections/Properties/PropertiesHero';
import { getExchangeRates, toCHFWithRates } from '@/utils/exchangeRate.server';
import { SearchFilters } from '@/components/sections/Properties/SearchFilters';
import {
  fetchProperties,
  fetchPropertyCategories,
} from '@/services/property.service';
import PropertyListingsSection from '@/components/sections/Properties/PropertyListingsSection';
import {
  buildPropertyFilterParams,
  parsePropertySearchParams,
} from '@/utils/propertyFilters';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations('Metadata.Properties');

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getLocalizedPath(locale, 'properties'),
    },
  };
}

export default async function PropertiesPage(props: Props) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const t = await getTranslations('Properties');

  const [categories, rates] = await Promise.all([
    fetchPropertyCategories({ locale }),
    getExchangeRates(),
  ]);

  const { properties, meta } = await fetchProperties({
    ...buildPropertyFilterParams(
      parsePropertySearchParams(searchParams),
      (amount, currency) => toCHFWithRates(amount, currency, rates)
    ),
    locale,
  });

  return (
    <ExchangeRatesProvider>
      <Suspense fallback={null}>
        <section className="relative">
          <PropertiesHero />
          <div className="relative z-10 -mt-16 sm:-mt-20 lg:-mt-24">
            <SearchFilters categories={categories} />
          </div>
        </section>
        <PropertyListingsSection properties={properties} meta={meta} />
        <section className="flex w-full justify-center">
          <RevealSection className="w-full max-w-[1240px] bg-grey-50 max-md:px-4 xl:rounded-[24px]">
            <BookConsultation2
              heading={t('BookConsultation.heading')}
              subHeading={t('BookConsultation.subHeading')}
              description={t('BookConsultation.description')}
              buttonText1={t('BookConsultation.buttonText1')}
              buttonText2={t('BookConsultation.buttonText2')}
            />
          </RevealSection>
        </section>
      </Suspense>
    </ExchangeRatesProvider>
  );
}
