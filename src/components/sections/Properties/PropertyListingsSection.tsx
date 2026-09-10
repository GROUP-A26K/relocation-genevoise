'use client';

import { useTransition } from 'react';

import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useExchangeRates } from '@/context/ExchangeRatesContext';

import PropertyResultsHeader from './PropertyResultsHeader';
import PropertyResultsContent from './PropertyResultsContent';

import type { Meta } from '@/models/Meta';
import type { IPropertyListing } from '@/models/Property';

interface Props {
  properties: IPropertyListing[];
  meta: Meta;
}

export default function PropertyListingsSection({ properties, meta }: Props) {
  const { convertToCHF } = useExchangeRates();
  const [isPending, startTransition] = useTransition();

  usePropertyFilters(convertToCHF, startTransition);

  return (
    <section className="flex flex-col items-center px-4 lg:px-[48px] xl:px-[60px] 2xl:px-[100px]">
      <div className="w-full max-w-[1240px]">
        <PropertyResultsHeader {...meta.pagination} />
        <PropertyResultsContent
          properties={properties}
          meta={meta}
          loading={isPending}
        />
      </div>
    </section>
  );
}
