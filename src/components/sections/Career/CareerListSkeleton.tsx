import JobCardSkeleton from '@/components/common/Card/JobCardSkeleton';

interface ICareerListSkeletonProps {
  count?: number;
}

export function CareerListSkeleton({ count = 5 }: ICareerListSkeletonProps) {
  return (
    <div
      className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-6 border-b border-grey-100 py-12 lg:max-w-none"
      aria-busy="true"
      aria-label="Loading career posts"
    >
      {Array.from({ length: count }, (_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}
