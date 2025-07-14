'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useCallback, useEffect, useState } from 'react';
import { parseAsString, parseAsInteger, useQueryStates } from 'nuqs';

import { Job } from '@/models/Job';
import { Meta } from '@/models/Meta';
import Section from '@/components/customs/Section';
import TabsMenu from '@/components/blocks/TabsMenu';
import { JobCard } from '@/components/customs/Card';
import { ParamsProps } from '@/services/blog.service';
import EmptyData from '@/components/customs/EmptyData';
import { AssuranceJobDepartment } from '@/sanity/types';
import { Pagination } from '@/components/blocks/Pagination';
import { Spinner } from '@/components/customs/Spinner/Spinner';
import { fetchJobPosts } from '@/services/career/career.service';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

import { ContentContainer } from './ContentContainer';

interface Props {
  departments: AssuranceJobDepartment[];
}

const initialParams = {
  page: 1,
  pageSize: 5,
  filterBy: '',
  locale: 'en',
  search: '',
};

export const PageView: FC<Props> = (props) => {
  const t = useTranslations('Career');
  const locale = useLocale();

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(initialParams.page),
      filterBy: parseAsString.withDefault(initialParams.filterBy),
      search: parseAsString.withDefault(initialParams.search),
    },
    { shallow: false, scroll: false }
  );

  const [data, setData] = useState<{ jobs: Job[]; meta: Meta }>({
    jobs: [],
    meta: {
      pagination: {
        page: 1,
        pageSize: 15,
        pageCount: 0,
        total: 0,
      },
    },
  });

  const [loading, setLoading] = useState(false);

  const searchParams: ParamsProps = {
    ...initialParams,
    locale,
    page: queryParams.page,
    filterBy: queryParams.filterBy,
  };

  const loadJobs = useCallback(async (params: ParamsProps) => {
    setLoading(true);
    const { jobs, meta } = await fetchJobPosts(params);
    setData({ jobs, meta });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadJobs(searchParams);
  }, [queryParams.page, queryParams.filterBy, loadJobs]);

  return (
    <>
      <Section>
        <div className="flex w-full items-center justify-center">
          <div className="flex flex-col lg:gap-6 gap-4 w-full lg:items-center text-left max-w-4xl">
            <div className="flex flex-col gap-3">
              <div className="text-sm font-semibold text-center text-secondary-500 !leading-[130%]">
                {t('heading')}
              </div>
              <h1 className="text-5xl font-bold text-center !leading-[130%]">
                {TextWithStrong(t('subHeading'))}
              </h1>
            </div>
            <p className="text-sm font-normal text-center text-black-200 !leading-[130%] text-balance">
              {t('description')}
            </p>
          </div>
        </div>
      </Section>

      <ContentContainer>
        <div className="flex lg:flex-row flex-col items-center justify-center gap-8">
          <div className="lg:w-fit w-full px-auto overflow-y-auto">
            <TabsMenu
              category={props.departments.map((dept) => ({
                title:
                  dept.title?.[locale as 'fr' | 'en'] || 'Unknown Department',
              }))}
              activeValue={queryParams.filterBy}
              onClick={(filterBy: string) =>
                setQueryParams({ filterBy, page: 1 })
              }
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="mx-auto w-full 2xl:max-w-[768px] xl:max-w-[660px] max-w-[768px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col">
            <AnimatePresence>
              {loading && (
                <motion.div
                  key="spinner"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Spinner />
                </motion.div>
              )}
            </AnimatePresence>

            <h2 className="sr-only">Job posts</h2>
            <AnimatePresence>
              {!loading && data.jobs.length === 0 && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none border-b border-grey-100"
                >
                  <EmptyData
                    title={t('emptyTitle')}
                    description={t('emptyDescription')}
                  />
                </motion.div>
              )}
              {!loading && data.jobs.length > 0 && (
                <motion.div
                  key="jobList"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none border-b border-grey-100"
                >
                  {data.jobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      options={{ isButtonLink: true }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {!loading && data.jobs.length > 0 && (
          <Pagination
            meta={data.meta}
            onClick={(page: number) => setQueryParams({ page })}
          />
        )}
      </ContentContainer>
    </>
  );
};
