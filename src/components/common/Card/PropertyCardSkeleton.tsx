import { Skeleton } from '@/components/ui/skeleton';

export default function PropertyCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-start gap-5">
      <Skeleton className="aspect-4/3 w-full rounded-2xl" />
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-3">
          <div className="flex gap-2">
            <Skeleton className="h-[26px] w-20 rounded-[6px]" />
            <Skeleton className="h-[26px] w-24 rounded-[6px]" />
          </div>
          <div className="flex h-[31px] items-center">
            <Skeleton className="h-6 w-4/5" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex h-[21px] items-center">
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex h-[21px] items-center">
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        </div>
        <div className="flex h-[31px] items-center lg:h-[39px]">
          <Skeleton className="h-7 w-40 lg:h-8" />
        </div>
      </div>
    </div>
  );
}
