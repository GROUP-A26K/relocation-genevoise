'use client';
import { ArrowUpRight, CircleDollarSign, MapPin } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/common/Button';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IJob } from '@/models/job';

type TJobCardOptions = {
  isButtonLink?: boolean;
};

export interface IJobCardProps {
  job: IJob;
  options?: TJobCardOptions;
}

export const JobCard: React.FC<IJobCardProps> = ({
  job,
  options = {
    isButtonLink: true,
  },
}) => {
  return (
    <Link href={job.href}>
      <div className="flex h-full w-full cursor-pointer flex-col gap-4 rounded-2xl border border-grey-200 p-6">
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-1 text-left leading-[130%]">
            <div className="flex flex-row flex-wrap justify-between gap-2">
              <BodyText
                variant="sm"
                className="line-clamp-1 leading-5 font-semibold text-secondary-600"
              >
                {job.department}
              </BodyText>
              {options?.isButtonLink && (
                <Button
                  as="link"
                  variant="md"
                  type="primary"
                  className="h-fit p-0 text-xs font-semibold text-black-500 lg:text-base"
                  iconEnd={ArrowUpRight}
                >
                  View details
                </Button>
              )}
            </div>

            <div className="flex flex-row flex-wrap gap-2">
              <HeadingText as="h3" className="line-clamp-1 text-lg leading-7">
                {job.title}
              </HeadingText>

              <Badge
                className={cn(
                  'truncate border border-grey-200 bg-grey-50 text-sm font-medium text-black-500 shadow-none hover:bg-grey-50',
                  job.employmentType === 'Internship' &&
                    'border-cyan-50 bg-cyan-50 text-cyan-600 hover:bg-cyan-50',
                  job.employmentType === 'Full-time' &&
                    'border-blue-50 bg-blue-50 text-blue-500 hover:bg-blue-50'
                )}
              >
                {job.employmentType}
              </Badge>
            </div>
          </div>
        </div>

        <BodyText
          variant="sm"
          title={job.excerpt || 'No description available.'}
          className="line-clamp-2 lg:text-sm"
        >
          {job.excerpt || 'No description available.'}
        </BodyText>

        <div className="flex flex-row flex-wrap">
          <div className="flex items-center gap-1.5 pr-6">
            <div className="w-4 min-w-4">
              <MapPin className="size-4 text-black-50" />
            </div>
            <BodyText
              variant="sm"
              className="line-clamp-1 leading-5 font-[number:inherit]"
            >
              {job.location}
            </BodyText>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-4 min-w-4">
              <CircleDollarSign className="size-4 text-black-50" />
            </div>
            <BodyText
              variant="sm"
              className="truncate leading-5 font-[number:inherit] text-nowrap"
            >{`${job.salaryMin} - ${job.salaryMax} ${job.currency}`}</BodyText>
          </div>
        </div>
      </div>
    </Link>
  );
};
