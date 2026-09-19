import { Skeleton } from '@/components/ui/skeleton';
import PaginationSkeleton from '@/components/common/Pagination/PaginationSkeleton';

import { PropertyListSkeleton } from './PropertyListSkeleton';

const FilterFieldSkeleton = () => (
  <div className="flex w-full flex-col gap-1.5 lg:w-[320px]">
    <Skeleton className="h-[18px] w-20" />
    <Skeleton className="h-10 w-full rounded-full" />
  </div>
);

export function PropertiesPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading properties">
      <section className="relative">
        <div className="relative w-full overflow-hidden">
          <Skeleton className="absolute inset-0 rounded-none" />
          <div className="relative flex flex-col items-center px-4 pt-12 pb-24 lg:px-[48px] lg:pt-16 lg:pb-40 xl:px-[60px] 2xl:px-[100px]">
            <div className="flex w-full max-w-[720px] flex-col items-center gap-4 lg:gap-6">
              <div className="flex w-full flex-col items-center gap-3">
                <Skeleton className="h-[18px] w-16 bg-white/40" />
                <div className="flex w-full flex-col items-center gap-2">
                  <Skeleton className="h-9 w-4/5 bg-white/40 lg:h-[54px]" />
                  <Skeleton className="h-9 w-3/5 bg-white/40 lg:h-[54px]" />
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-1.5">
                <Skeleton className="h-3.5 w-full bg-white/40" />
                <Skeleton className="h-3.5 w-full bg-white/40" />
                <Skeleton className="h-3.5 w-1/2 bg-white/40" />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 -mt-16 sm:-mt-20 lg:-mt-24">
          <div className="flex items-start justify-center px-4 pb-12 lg:px-[48px] lg:pb-16 xl:px-[60px] 2xl:px-[100px]">
            <div className="w-full max-w-[1240px] rounded-3xl bg-white px-4 pt-6 pb-4 shadow-[0px_2px_20px_0px_rgba(211,211,211,0.4)] lg:p-8">
              <div className="flex flex-col items-end gap-6 lg:flex-row lg:gap-5">
                <FilterFieldSkeleton />
                <FilterFieldSkeleton />
                <FilterFieldSkeleton />
                <FilterFieldSkeleton />
                <Skeleton className="h-10 w-full shrink-0 rounded-full max-md:mt-2 md:w-40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center px-4 lg:px-[48px] xl:px-[60px] 2xl:px-[100px]">
        <div className="w-full max-w-[1240px]">
          <div className="mb-8 flex gap-4 max-md:flex-col-reverse md:items-center md:justify-between">
            <Skeleton className="h-5 w-48" />
            <div className="flex items-center gap-3 max-md:justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-10 rounded-full" />
                <Skeleton className="h-5 w-36" />
              </div>
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>
          </div>
          <PropertyListSkeleton />
          <PaginationSkeleton />
        </div>
      </section>

      <section className="flex w-full justify-center">
        <Skeleton className="h-[480px] w-full max-w-[1240px] rounded-none md:h-[360px] xl:rounded-[24px]" />
      </section>
    </div>
  );
}
