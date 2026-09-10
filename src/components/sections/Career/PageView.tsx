'use client';

import { type FC, useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'motion/react';
import { parseAsString, parseAsInteger, useQueryStates } from 'nuqs';

import Section from '@/components/customs/Section';
import TabsMenu from '@/components/blocks/TabsMenu';
import { JobCard } from '@/components/customs/Card';
import EmptyData from '@/components/customs/EmptyData';
import { RevealItem } from '@/components/customs/Reveal';
import { Pagination } from '@/components/blocks/Pagination';
import { Spinner } from '@/components/customs/Spinner/Spinner';
import { TextWithStrong } from '@/components/customs/Text/TextWithStrong';

import { ContentContainer } from './ContentContainer';

import type { Job } from '@/models/Job';
import type { Meta } from '@/models/Meta';
import type { AssuranceJobDepartment } from '@/sanity/types';

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
        <RevealItem className="flex flex-col items-center justify-center gap-8 lg:flex-row">
          <div className="px-auto w-full overflow-y-auto lg:w-fit">
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
        </RevealItem>

        <RevealItem className="flex flex-col items-center justify-center">
          <div className="mx-auto flex w-full max-w-[768px] flex-col gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-[660px] 2xl:max-w-[768px]">
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
                  className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-b border-grey-100 py-12 lg:max-w-none"
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
                  className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-b border-grey-100 py-12 lg:max-w-none"
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
        </RevealItem>

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
