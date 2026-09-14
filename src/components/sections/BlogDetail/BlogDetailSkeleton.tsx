import { Skeleton } from '@/components/ui/skeleton';
import BlogCardSkeleton from '@/components/customs/Card/BlogCardSkeleton';
import SectionSkeleton from '@/components/customs/Section/SectionSkeleton';

const TOC_WIDTHS = ['w-full', 'w-4/5', 'w-11/12', 'w-3/4', 'w-full', 'w-2/3'];

const ContentBlockSkeleton = ({ lines }: { lines: number }) => (
  <div className="flex flex-col gap-4">
    <Skeleton className="h-8 w-2/3" />
    <div className="flex flex-col gap-2.5">
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className={`h-4 ${index === lines - 1 ? 'w-3/5' : 'w-full'}`}
        />
      ))}
    </div>
  </div>
);

export function BlogDetailSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading blog post">
      <SectionSkeleton dividerClassName="hidden">
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex w-full justify-center">
            <div className="flex w-full max-w-3xl flex-col items-center gap-4 lg:gap-6">
              <div className="flex w-full flex-col items-center gap-3">
                <Skeleton className="h-[18px] w-10" />
                <div className="flex w-full flex-col items-center gap-2 lg:gap-3">
                  <Skeleton className="h-9 w-full lg:h-12" />
                  <Skeleton className="h-9 w-3/4 lg:h-12" />
                </div>
              </div>
              <div className="flex w-full flex-col items-center gap-1.5">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-2/3" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-md" />
                <Skeleton className="h-6 w-28 rounded-md" />
              </div>
            </div>
          </div>
          <Skeleton className="aspect-1240/620 w-full rounded-3xl" />
        </div>
      </SectionSkeleton>

      <SectionSkeleton>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[263fr_945fr]">
          <div className="hidden h-fit flex-col gap-8 lg:flex">
            <Skeleton className="h-[26px] w-40" />
            <div className="flex flex-col gap-1 border-l-2 border-grey-50">
              {TOC_WIDTHS.map((width, index) => (
                <div key={index} className="px-4 py-3">
                  <Skeleton className={`h-5 ${width}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3 lg:hidden">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>

          <div className="flex w-full max-w-180 flex-col gap-8">
            <ContentBlockSkeleton lines={6} />
            <ContentBlockSkeleton lines={5} />
            <ContentBlockSkeleton lines={7} />
            <div className="flex flex-col justify-between gap-y-6 border-t border-grey-100 pt-6 lg:flex-row">
              <div className="flex items-center gap-3">
                <Skeleton className="size-12 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3.5 w-40" />
                </div>
              </div>
              <Skeleton className="h-10 w-36 rounded-full" />
            </div>
          </div>
        </div>
      </SectionSkeleton>

      <SectionSkeleton>
        <div className="flex flex-col gap-12 lg:gap-16">
          <div className="flex flex-row items-end justify-between">
            <div className="flex w-full max-w-xl flex-col gap-4 lg:gap-6">
              <div className="flex flex-col gap-3">
                <Skeleton className="h-[18px] w-24" />
                <Skeleton className="h-[39px] w-72 max-w-full" />
              </div>
              <Skeleton className="h-[18px] w-full max-w-md" />
            </div>
            <Skeleton className="hidden h-10 w-28 rounded-full lg:block" />
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <BlogCardSkeleton key={index} />
            ))}
          </div>
          <Skeleton className="h-10 w-full rounded-full lg:hidden" />
        </div>
      </SectionSkeleton>
    </div>
  );
}
