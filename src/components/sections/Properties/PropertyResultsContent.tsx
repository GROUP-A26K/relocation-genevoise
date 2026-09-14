'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import Show from '@/components/customs/Show';
import EmptyData from '@/components/customs/EmptyData';
import { PropertyCard } from '@/components/customs/Card';
import { Pagination } from '@/components/blocks/Pagination';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';

import { PropertyListSkeleton } from './PropertyListSkeleton';

import type { Meta } from '@/models/Meta';
import type { IPropertyListing } from '@/models/Property';

interface IPropertyResultsContentProps {
  properties: IPropertyListing[];
  meta: Meta;
  loading: boolean;
}

export default function PropertyResultsContent({
  properties,
  meta,
  loading,
}: IPropertyResultsContentProps) {
  const t = useTranslations('Properties');
  const { handlePageChange, queryParams } = usePropertyFilters();
  const pathname = usePathname();
  const displayCurrency = queryParams.currency || undefined;

  return (
    <Show when={!loading} fallback={<PropertyListSkeleton />}>
      <Show
        when={properties.length > 0}
        fallback={
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <EmptyData
              title={t('emptyData.title')}
              description={t('emptyData.description')}
            />
          </motion.div>
        }
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
        >
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              displayCurrency={displayCurrency}
            />
          ))}
        </motion.div>

        <Show when={meta.pagination.pageCount > 1}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Pagination
              meta={meta}
              onClick={handlePageChange}
              getPageHref={(page) => {
                const params = new URLSearchParams();
                if (page > 1) params.set('page', String(page));
                if (queryParams.categories)
                  params.set('categories', queryParams.categories);
                if (queryParams.location)
                  params.set('location', queryParams.location);
                if (queryParams.priceRange)
                  params.set('priceRange', queryParams.priceRange);
                if (queryParams.currency)
                  params.set('currency', queryParams.currency);
                if (queryParams.sort) params.set('sort', queryParams.sort);
                if (queryParams.rooms) params.set('rooms', queryParams.rooms);
                if (queryParams.availableOnly)
                  params.set('availableOnly', 'true');
                const query = params.toString();
                return `${pathname}${query ? `?${query}` : ''}`;
              }}
              className="pt-4 xl:pt-8"
            />
          </motion.div>
        </Show>
      </Show>
    </Show>
  );
}
