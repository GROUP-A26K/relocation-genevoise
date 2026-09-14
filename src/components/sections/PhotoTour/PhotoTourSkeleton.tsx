import { Skeleton } from '@/components/ui/skeleton';
import SectionSkeleton from '@/components/customs/Section/SectionSkeleton';

const HeaderSkeleton = () => (
  <div className="flex flex-col gap-8 lg:pb-16">
    <div className="flex flex-col items-start gap-3">
      <div className="flex items-center gap-2">
        <Skeleton className="size-[18px] rounded-md" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-[39px] w-80 max-w-full" />
    </div>

    <div className="hidden w-full gap-8 lg:grid lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: 5 }, (_, index) => (
        <div
          key={index}
          className="flex shrink-0 flex-col gap-6 lg:last:hidden xl:last:flex"
        >
          <Skeleton className="aspect-[224.4/167] w-full rounded-2xl" />
          <Skeleton className="h-[26px] w-2/3" />
        </div>
      ))}
    </div>
  </div>
);

const AreaSkeleton = () => (
  <div className="flex w-full flex-col gap-8 lg:flex-row lg:gap-16">
    <div className="flex flex-col gap-3 lg:flex-1 lg:gap-6 lg:py-6">
      <Skeleton className="h-[39px] w-1/2" />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-3/4" />
      </div>
    </div>

    <div className="flex min-w-0 flex-col gap-4 lg:flex-2">
      <Skeleton className="aspect-784/480 w-full rounded-3xl" />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton
            key={index}
            className="aspect-168/120 w-[120px] shrink-0 rounded-xl sm:w-[140px] lg:w-[168px]"
          />
        ))}
      </div>
    </div>
  </div>
);

export function PhotoTourSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading photo tour">
      <SectionSkeleton isDivider>
        <HeaderSkeleton />
        <div className="flex flex-col gap-16">
          {Array.from({ length: 2 }, (_, index) => (
            <AreaSkeleton key={index} />
          ))}
        </div>
      </SectionSkeleton>
    </div>
  );
}
