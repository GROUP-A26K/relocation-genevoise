import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { HydrationBoundary } from '@tanstack/react-query';

import { getPageAlternates } from '@/utils/seo';
import { PageView } from '@/components/sections/Career';
import { hydrateCareerList } from '@/features/career/career.hydration';
import { CareerPageSkeleton } from '@/components/sections/Career/CareerPageSkeleton';
import {
  normalizeCareerListFilters,
  parseCareerSearchParams,
} from '@/features/career/career.searchParams';

import type { Metadata } from 'next';

const PAGE_SIZE = 5;

export async function generateMetadata(
  props: PageProps<'/[locale]/career'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Career',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: getPageAlternates(locale, 'career'),
  };
}

export default async function Page(props: PageProps<'/[locale]/career'>) {
  const { locale } = await props.params;
  const filters = parseCareerSearchParams(await props.searchParams);

  const { state, departments, careerList } = await hydrateCareerList(
    normalizeCareerListFilters({ locale, pageSize: PAGE_SIZE, ...filters })
  );

  return (
    <Suspense fallback={<CareerPageSkeleton />}>
      <HydrationBoundary state={state}>
        <PageView
          departments={departments.departments}
          jobs={careerList.jobs}
          meta={careerList.meta}
        />
      </HydrationBoundary>
    </Suspense>
  );
}
