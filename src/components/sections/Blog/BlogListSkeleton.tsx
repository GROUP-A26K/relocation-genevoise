import BlogCardSkeleton from '@/components/customs/Card/BlogCardSkeleton';

interface IBlogListSkeletonProps {
  count?: number;
}

export function BlogListSkeleton({ count = 9 }: IBlogListSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading blog posts"
    >
      {Array.from({ length: count }, (_, index) => (
        <BlogCardSkeleton key={index} />
      ))}
    </div>
  );
}
