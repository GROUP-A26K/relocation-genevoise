'use client';

import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useTransition } from 'react';
import { parseAsString, parseAsInteger, useQueryStates } from 'nuqs';

import { Job } from '@/models/Job';
import { Meta } from '@/models/Meta';
import Section from '@/components/customs/Section';
import TabsMenu from '@/components/blocks/TabsMenu';
import { JobCard } from '@/components/customs/Card';
import EmptyData from '@/components/customs/EmptyData';
import { AssuranceJobDepartment } from '@/sanity/types';
import { Pagination } from '@/components/blocks/Pagination';
import { Spinner } from '@/components/customs/Spinner/Spinner';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

import { ContentContainer } from './ContentContainer';

interface Props {
  departments: AssuranceJobDepartment[];
  jobs: Job[];
  meta: Meta;
}

export const PageView: FC<Props> = (props) => {
  const t = useTranslations('Career');
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(1),
      filterBy: parseAsString.withDefault(''),
    },
    { shallow: false, scroll: false, startTransition }
  );

  const showEmpty = !isPending && props.jobs.length === 0;
  const showList = !isPending && props.jobs.length > 0;

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
              {isPending && (
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
              {showEmpty && (
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
              {showList && (
                <motion.div
                  key="jobList"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 lg:max-w-none border-b border-grey-100"
                >
                  {props.jobs.map((job) => (
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

        {showList && (
          <Pagination
            meta={props.meta}
            onClick={(page: number) => setQueryParams({ page })}
          />
        )}
      </ContentContainer>
    </>
  );
};
