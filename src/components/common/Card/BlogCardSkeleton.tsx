import { Skeleton } from '@/components/ui/skeleton';

export default function BlogCardSkeleton() {
  return (
    <div className="flex h-full flex-col items-start">
      <Skeleton className="aspect-392/250 w-full shrink-0 rounded-2xl" />
      <div className="flex w-full flex-1 flex-col justify-between pt-5">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-6 w-28 rounded-md" />
          </div>
          <div className="flex h-[52px] flex-col justify-center gap-2 lg:h-[62px]">
            <Skeleton className="h-5 w-full lg:h-6" />
            <Skeleton className="h-5 w-3/5 lg:h-6" />
          </div>
          <div className="flex h-[54px] flex-col justify-center gap-2 lg:h-[62px]">
            <Skeleton className="h-3.5 w-full lg:h-4" />
            <Skeleton className="h-3.5 w-full lg:h-4" />
            <Skeleton className="h-3.5 w-2/3 lg:h-4" />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>
          <Skeleton className="h-3.5 w-24 self-end" />
        </div>
      </div>
    </div>
  );
}
