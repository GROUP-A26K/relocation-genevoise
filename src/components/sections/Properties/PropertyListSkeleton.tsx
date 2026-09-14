import PropertyCardSkeleton from '@/components/customs/Card/PropertyCardSkeleton';

interface IPropertyListSkeletonProps {
  count?: number;
}

export function PropertyListSkeleton({
  count = 12,
}: IPropertyListSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading properties"
    >
      {Array.from({ length: count }, (_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
}
