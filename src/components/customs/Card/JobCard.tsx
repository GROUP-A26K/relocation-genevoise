'use client';

import { Badge } from '@/components/ui/badge';
import { Link } from '@/libs/i18nNavigation';
import { ArrowUpRight, CircleDollarSign, MapPin } from 'lucide-react';
import Button from '../Button';
import { Job } from '@/models/Job';
import { cn } from '@/libs/utils';

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
      <div className="flex flex-col gap-4 h-full cursor-pointer border border-grey-200 p-6 rounded-2xl w-full">
        <div className="flex flex-col w-full">
          <div className="flex flex-col gap-1 text-left !leading-[130%]">
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
                  className="h-fit p-0 lg:text-base text-xs text-black-500 font-semibold"
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
                  'truncate text-sm font-medium text-black-500 bg-grey-50 border border-grey-200 hover:bg-grey-50 shadow-none',
                  job.employmentType === 'Internship' &&
                    'bg-cyan-50 text-cyan-600 border-cyan-50 hover:bg-cyan-50',
                  job.employmentType === 'Full-time' &&
                    'text-blue-500 bg-blue-50 border-blue-50 hover:bg-blue-50'
                )}
              >
                {job.employmentType}
              </Badge>
            </div>
          </div>
        </div>

        <p
          title={job.excerpt || 'No description available.'}
          className="line-clamp-2 text-sm lg:text-sm font-normal text-black-200 !leading-[130%]"
        >
          {job.excerpt || 'No description available.'}
        </p>

        <div className="flex flex-row flex-wrap">
          <div className="flex items-center gap-1.5 !pr-6">
            <div className="min-w-4 w-4">
              <MapPin className="size-4 text-black-50" />
            </div>
            <p className="line-clamp-1 text-sm text-black-200">
              {job.location}
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <div className="min-w-4 w-4">
              <CircleDollarSign className="size-4 text-black-50" />
            </div>
            <p className="truncate text-sm text-black-200">{`${job.salaryMin} - ${job.salaryMax} ${job.currency}`}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
