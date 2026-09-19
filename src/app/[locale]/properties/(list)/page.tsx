import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { HydrationBoundary } from '@tanstack/react-query';

import { getPageAlternates } from '@/utils/seo';
import { ExchangeRatesProvider } from '@/context/ExchangeRatesContext';
import PropertiesHero from '@/components/sections/Properties/PropertiesHero';
import { hydratePropertyList } from '@/features/property/property.hydration';
import { getExchangeRates, toCHFWithRates } from '@/utils/exchangeRate.server';
import { SearchFilters } from '@/components/sections/Properties/SearchFilters';
import { BookConsultation } from '@/components/common/Consultation/BookConsultation';
import PropertyListingsSection from '@/components/sections/Properties/PropertyListingsSection';
import { PropertiesPageSkeleton } from '@/components/sections/Properties/PropertiesPageSkeleton';
import {
  buildPropertyFilterParams,
  parsePropertySearchParams,
} from '@/features/property/property.searchParams';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/properties'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Metadata.Properties' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, '/properties'),
  };
}

export default async function PropertiesPage(
  props: PageProps<'/[locale]/properties'>
) {
  const { locale } = await props.params;
  const searchParams = await props.searchParams;
  const t = await getTranslations('Properties');

  const rates = await getExchangeRates();
  const propertyFilters = {
    ...buildPropertyFilterParams(
      parsePropertySearchParams(searchParams),
      (amount, currency) => toCHFWithRates(amount, currency, rates)
    ),
    locale,
  };

  const { state, categories, propertyList } =
    await hydratePropertyList(propertyFilters);

  return (
    <Suspense fallback={<PropertiesPageSkeleton />}>
      <ExchangeRatesProvider initialRates={rates}>
        <PropertiesHero />
        <div className="relative z-10 -mt-16 sm:-mt-20 lg:-mt-24">
          <SearchFilters categories={categories.categories} />
        </div>
        <HydrationBoundary state={state}>
          <PropertyListingsSection
            properties={propertyList.properties}
            meta={propertyList.meta}
          />
        </HydrationBoundary>
        <BookConsultation
          heading={t('BookConsultation.heading')}
          subHeading={t('BookConsultation.subHeading')}
          description={t('BookConsultation.description')}
          buttonText1={t('BookConsultation.buttonText1')}
          buttonText2={t('BookConsultation.buttonText2')}
        />
      </ExchangeRatesProvider>
    </Suspense>
  );
}
