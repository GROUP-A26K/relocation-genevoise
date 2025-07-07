'use client';

import { FC } from 'react';
import { JobCard } from '@/components/customs/Card';
import { Job } from '@/models/Job';
import { useTranslations } from 'next-intl';

interface Props {
  jobs: Job[];
}

export const RelatedItemsPanel: FC<Props> = ({ jobs }) => {
  const t = useTranslations('CareerDetail.FeaturedJob');

  return (
    <aside className="flex-1 flex flex-col gap-8">
      <h2 className="text-black text-xl font-semibold leading-relaxed">
        {t('title')}
      </h2>

      <ul className="flex flex-col gap-6 w-full xl:max-w-[408px] xl:min-w-[408px] lg:max-w-[350px] lg:min-w-[350px]">
        {jobs.map((job) => (
          <li key={job.id}>
            <JobCard job={job} options={{ isButtonLink: false }} />
          </li>
        ))}
      </ul>
    </aside>
  );
};
