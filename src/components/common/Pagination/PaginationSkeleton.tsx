import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface IPaginationSkeletonProps {
  className?: string;
}

export default function PaginationSkeleton({
  className,
}: IPaginationSkeletonProps) {
  return (
    <div className={cn('w-full py-12 lg:py-16', className)}>
      <div className="hidden w-full items-center justify-between border-t border-grey-100 pt-8 lg:flex">
        <div className="h-10 w-24" />
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton key={index} className="size-10 rounded-full" />
          ))}
        </div>
        <Skeleton className="h-10 w-20 rounded-full" />
      </div>
      <div className="flex w-full items-center justify-between border-t border-grey-100 pt-8 lg:hidden">
        <Skeleton className="size-10 rounded-xl" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-10 rounded-xl" />
      </div>
    </div>
  );
}
