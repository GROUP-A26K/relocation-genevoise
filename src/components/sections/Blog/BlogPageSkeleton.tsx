import { Skeleton } from '@/components/ui/skeleton';
import TabsSkeleton from '@/components/blocks/TabsMenu/TabsSkeleton';
import SectionSkeleton from '@/components/customs/Section/SectionSkeleton';
import PaginationSkeleton from '@/components/blocks/Pagination/PaginationSkeleton';

import { BlogListSkeleton } from './BlogListSkeleton';

const FeaturedBlogSkeleton = () => (
  <div className="grid grid-cols-1 items-start gap-5 rounded-2xl lg:grid-cols-[432fr_776fr] lg:items-center lg:gap-8 lg:bg-grey-50">
    <div className="order-2 flex w-full flex-col justify-between gap-6 lg:order-1 lg:p-8">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-28 rounded-md" />
          <Skeleton className="h-6 w-20 rounded-md" />
        </div>
        <div className="flex flex-col gap-2 py-1">
          <Skeleton className="h-5 w-full lg:h-8" />
          <Skeleton className="h-5 w-full lg:h-8" />
          <Skeleton className="h-5 w-1/2 lg:h-8" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3.5 w-full lg:h-4" />
          <Skeleton className="h-3.5 w-full lg:h-4" />
          <Skeleton className="h-3.5 w-3/4 lg:h-4" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3.5 w-20" />
          </div>
        </div>
        <Skeleton className="h-3.5 w-24 self-end" />
      </div>
    </div>
    <Skeleton className="order-1 aspect-776/495 w-full rounded-2xl lg:order-2" />
  </div>
);

export function BlogPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading blog">
      <SectionSkeleton isDivider>
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex w-full flex-col items-center gap-4 lg:gap-6">
            <div className="flex w-full flex-col items-center gap-3">
              <Skeleton className="h-[18px] w-12" />
              <Skeleton className="h-[39px] w-64 max-w-full" />
            </div>
            <Skeleton className="h-[18px] w-full max-w-lg" />
          </div>
          <FeaturedBlogSkeleton />
        </div>
      </SectionSkeleton>

      <SectionSkeleton childrenClassName="xl:gap-12">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div className="w-full overflow-hidden lg:w-fit">
            <TabsSkeleton count={3} />
          </div>
          <Skeleton className="h-10 w-full rounded-full lg:max-w-70" />
        </div>
        <BlogListSkeleton />
        <PaginationSkeleton className="py-0 lg:py-0" />
      </SectionSkeleton>
    </div>
  );
}
