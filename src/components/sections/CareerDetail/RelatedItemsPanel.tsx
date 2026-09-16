'use client';

import { useTranslations } from 'next-intl';

import { JobCard } from '@/components/common/Card';
import { RevealItem } from '@/components/common/Reveal';

import type { IJob } from '@/models/job';

interface IRelatedItemsPanelProps {
  jobs: IJob[];
}

export const RelatedItemsPanel: React.FC<IRelatedItemsPanelProps> = ({
  jobs,
}) => {
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
