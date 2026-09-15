'use client';

import { useLocale } from 'next-intl';

import Section from '@/components/customs/Section';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useExchangeRates } from '@/context/ExchangeRatesContext';
import { usePropertyList } from '@/features/property/property.hooks';
import useScrollIntoViewOnChange from '@/hooks/useScrollIntoViewOnChange';

import PropertyResultsHeader from './PropertyResultsHeader';
import PropertyResultsContent from './PropertyResultsContent';

import type { Meta } from '@/models/meta';
import type { IPropertyListing } from '@/models/property';

interface IPropertyListingsSectionProps {
  properties: IPropertyListing[];
  meta: Meta;
}

export default function PropertyListingsSection({
  properties,
  meta,
}: IPropertyListingsSectionProps) {
  const { convertToCHF } = useExchangeRates();

  const locale = useLocale();

  const { filterParams, queryParams } = usePropertyFilters(convertToCHF);
  const propertyQuery = usePropertyList({ ...filterParams, locale });
  const displayedProperties = propertyQuery.data?.properties ?? properties;
  const displayedMeta = propertyQuery.data?.meta ?? meta;
  const loading = propertyQuery.isPending || propertyQuery.isPlaceholderData;

  const listTopRef = useScrollIntoViewOnChange<HTMLElement>(
    JSON.stringify(queryParams)
  );

  return (
    <Section
      ref={listTopRef}
      className="flex scroll-mt-26 flex-col items-center"
      wrapperProps={{
        className: 'pt-0 px-4 lg:px-12 xl:px-15 2xl:px-25 2xl:pt-0',
      }}
      childrenProps={{ className: 'gap-8 xl:gap-8' }}
    >
      <PropertyResultsHeader {...displayedMeta.pagination} />
      <PropertyResultsContent
        properties={displayedProperties}
        meta={displayedMeta}
        loading={loading}
      />
    </Section>
  );
}
