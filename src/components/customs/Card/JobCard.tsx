'use client';

import { ArrowUpRight, CircleDollarSign, MapPin } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { Badge } from '@/components/ui/badge';
import Button from '@/components/customs/Button';

import type { Job } from '@/models/Job';

export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Intern';
interface Options {
  isButtonLink?: boolean;
}
export interface Props {
  job: Job;
  options?: Options;
}
export const JobCard: React.FC<Props> = ({
  job,
  options = {
    isButtonLink: true,
  },
}) => {
  return (
    <Link href={job.href}>
      <div className="flex h-full w-full cursor-pointer flex-col gap-4 rounded-2xl border border-grey-200 p-6">
        <div className="flex w-full flex-col">
          <div className="flex flex-col gap-1 text-left leading-[130%]!">
            <div className="flex flex-row flex-wrap justify-between gap-2">
              <p className="line-clamp-1 text-sm font-semibold text-secondary-600">
                {job.department}
              </p>
              {options?.isButtonLink && (
                <Button
                  as="link"
                  href={job.href}
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
              <h3 className="line-clamp-1 text-lg font-semibold text-black-500">
                {job.title}
              </h3>

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

        <p
          title={job.excerpt || 'No description available.'}
          className="line-clamp-2 text-sm leading-[130%]! font-normal text-black-200 lg:text-sm"
        >
          {job.excerpt || 'No description available.'}
        </p>

        <div className="flex flex-row flex-wrap">
          <div className="flex items-center gap-1.5 pr-6!">
            <div className="w-4 min-w-4">
              <MapPin className="size-4 text-black-50" />
            </div>
            <p className="line-clamp-1 text-sm text-black-200">
              {job.location}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="w-4 min-w-4">
              <CircleDollarSign className="size-4 text-black-50" />
            </div>
            <p className="truncate text-sm text-black-200">{`${job.salaryMin} - ${job.salaryMax} ${job.currency}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
