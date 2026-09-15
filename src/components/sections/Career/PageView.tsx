'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { parseAsString, parseAsInteger, useQueryStates } from 'nuqs';

import Show from '@/components/customs/Show';
import Section from '@/components/customs/Section';
import TabsMenu from '@/components/blocks/TabsMenu';
import { JobCard } from '@/components/customs/Card';
import EmptyData from '@/components/customs/EmptyData';
import { RevealItem } from '@/components/customs/Reveal';
import { Pagination } from '@/components/blocks/Pagination';
import useScrollIntoViewOnChange from '@/hooks/useScrollIntoViewOnChange';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';
import { normalizeCareerListFilters } from '@/features/career/career.searchParams';
import {
  useCareerDepartments,
  useCareerList,
} from '@/features/career/career.hooks';

import { ContentContainer } from './ContentContainer';
import { CareerListSkeleton } from './CareerListSkeleton';

import type { Job } from '@/models/job';
import type { Meta } from '@/models/meta';
import type { DEPARTMENT_QUERY_RESULT } from '@/sanity/types';

interface IPageViewProps {
  departments: DEPARTMENT_QUERY_RESULT;
  jobs: Job[];
  meta: Meta;
}

export const PageView: React.FC<IPageViewProps> = (props) => {
  const t = useTranslations('Career');
  const locale = useLocale();
  const pathname = usePathname();

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      filterBy: parseAsString.withDefault(''),
    },
    { shallow: true, scroll: false }
  );

  const filters = normalizeCareerListFilters({
    locale,
    page: queryParams.page,
    pageSize: 5,
    filterBy: queryParams.filterBy,
  });
  const listQuery = useCareerList(filters);
  const departmentQuery = useCareerDepartments(locale);
  const jobs = listQuery.data?.jobs ?? props.jobs;
  const meta = listQuery.data?.meta ?? props.meta;
  const departments = departmentQuery.data?.departments ?? props.departments;
  const loading = listQuery.isPending || listQuery.isPlaceholderData;

  const listTopRef = useScrollIntoViewOnChange<HTMLDivElement>(
    `${queryParams.page}|${queryParams.filterBy}`
  );

  return (
    <>
      <Section revealTrigger="load">
        <RevealItem className="flex w-full items-center justify-center">
          <div className="flex w-full max-w-4xl flex-col gap-4 text-left lg:items-center lg:gap-6">
            <div className="flex flex-col gap-3">
              <div className="text-center text-sm leading-[130%]! font-semibold text-secondary-500">
                {t('heading')}
              </div>
              <h1 className="text-center text-5xl leading-[130%]! font-bold">
                {TextWithStrong(t('subHeading'))}
              </h1>
            </div>
            <p className="text-center text-sm leading-[130%]! font-normal text-balance text-black-200">
              {t('description')}
            </p>
          </div>
        </RevealItem>
      </Section>

      <ContentContainer>
        <RevealItem
          ref={listTopRef}
          className="flex scroll-mt-26 flex-col items-center justify-center gap-8 lg:flex-row"
        >
          <div className="px-auto w-full overflow-y-auto lg:w-fit">
            <TabsMenu
              category={departments.map((dept) => ({
                title:
                  dept.title?.[locale as 'fr' | 'en'] || 'Unknown Department',
              }))}
              activeValue={queryParams.filterBy}
              onClick={(filterBy: string) =>
                setQueryParams({ filterBy, page: 1 })
              }
            />
          </div>
        </RevealItem>

        <RevealItem className="flex flex-col items-center justify-center">
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-165 2xl:max-w-3xl">
            <h2 className="sr-only">Job posts</h2>
            <Show when={!loading} fallback={<CareerListSkeleton />}>
              <Show
                when={jobs.length > 0}
                fallback={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-b border-grey-100 py-12 lg:max-w-none"
                  >
                    <EmptyData
                      title={t('emptyTitle')}
                      description={t('emptyDescription')}
                    />
                  </motion.div>
                }
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 py-12 lg:max-w-none"
                >
                  {jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      options={{ isButtonLink: true }}
                    />
                  ))}
                </motion.div>
              </Show>
            </Show>
          </div>
        </RevealItem>

        <Show when={!loading && jobs.length > 0}>
          <Pagination
            meta={meta}
            onClick={(page: number) => setQueryParams({ page })}
            getPageHref={(page) => {
              const params = new URLSearchParams();
              if (page > 1) params.set('page', String(page));
              if (queryParams.filterBy)
                params.set('filterBy', queryParams.filterBy);
              return `${pathname}${params.toString() ? `?${params.toString()}` : ''}`;
            }}
          />
        </Show>
      </ContentContainer>
    </>
  );
};
