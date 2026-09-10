'use client';

import { useTranslations } from 'next-intl';

import { JobCard } from '@/components/customs/Card';
import { RevealItem } from '@/components/customs/Reveal';

import type { FC } from 'react';
import type { Job } from '@/models/Job';

interface Props {
  jobs: Job[];
}

export const RelatedItemsPanel: FC<Props> = ({ jobs }) => {
  const t = useTranslations('CareerDetail.FeaturedJob');

  return (
    <RevealItem as="aside" className="flex flex-1 flex-col gap-8">
      <h2 className="text-xl leading-relaxed font-semibold text-black">
        {t('title')}
      </h2>

      <ul className="flex w-full flex-col gap-6 lg:max-w-[350px] lg:min-w-[350px] xl:max-w-[408px] xl:min-w-[408px]">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} options={{ isButtonLink: false }} />
          </li>
        ))}
      </ul>
    </RevealItem>
  );
};
