import { Skeleton } from '@/components/ui/skeleton';

interface IJobCardSkeletonProps {
  isButtonLink?: boolean;
}

export default function JobCardSkeleton({
  isButtonLink = true,
}: IJobCardSkeletonProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl border border-grey-200 p-6">
      <div className="flex flex-col gap-1">
        <div className="flex h-[21px] items-center justify-between gap-2">
          <Skeleton className="h-4 w-24" />
          {isButtonLink && <Skeleton className="h-4 w-24" />}
        </div>
        <div className="flex h-7 items-center gap-2">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
      </div>
      <div className="flex h-9 flex-col justify-center gap-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-2/3" />
      </div>
      <div className="flex h-5 items-center gap-6">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
