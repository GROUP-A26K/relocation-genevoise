import { Skeleton } from '@/components/ui/skeleton';

const TAB_WIDTHS = ['w-[92px]', 'w-28', 'w-32', 'w-24', 'w-28'];

interface ITabsSkeletonProps {
  count?: number;
}

export default function TabsSkeleton({ count = 3 }: ITabsSkeletonProps) {
  return (
    <div className="flex w-fit gap-1 rounded-full bg-grey-50 p-1">
      {Array.from({ length: count }, (_, index) => (
        <Skeleton
          key={index}
          className={`h-10 rounded-full ${TAB_WIDTHS[index % TAB_WIDTHS.length]}`}
        />
      ))}
    </div>
  );
}
