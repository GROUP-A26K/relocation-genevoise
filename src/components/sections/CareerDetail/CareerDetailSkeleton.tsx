import { Skeleton } from '@/components/ui/skeleton';
import JobCardSkeleton from '@/components/common/Card/JobCardSkeleton';

interface IContentBlockSkeletonProps {
  lines: number;
}

const ContentBlockSkeleton = ({ lines }: IContentBlockSkeletonProps) => (
  <div className="flex w-full flex-col gap-4">
    <Skeleton className="h-7 w-1/2" />
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

export function CareerDetailSkeleton() {
  return (
    <section
      className="flex flex-col items-center justify-center"
      aria-busy="true"
      aria-label="Loading career post"
    >
      <div className="container px-4 pt-12 pb-14 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] lg:pt-16 lg:pb-16 xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
        <div className="flex flex-col items-start justify-start gap-16 lg:flex-row">
          <div className="flex w-full flex-col">
            <div className="mx-auto flex w-full max-w-[720px] flex-col lg:mx-0 lg:max-w-[570px] xl:max-w-[620px] 2xl:max-w-[720px]">
              <div className="flex w-full flex-col gap-6 pb-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-10 w-2/3" />
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="h-5 w-20" />
                    <div className="h-4 w-px bg-slate-200" />
                    <Skeleton className="h-5 w-24" />
                    <div className="h-4 w-px bg-slate-200" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-28 rounded-full" />
                  <Skeleton className="h-10 w-24 rounded-full" />
                </div>
              </div>
              <div className="flex flex-col gap-8">
                <div className="h-px bg-slate-200" />
                <ContentBlockSkeleton lines={4} />
                <ContentBlockSkeleton lines={6} />
                <ContentBlockSkeleton lines={5} />
              </div>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-8 lg:w-auto">
            <Skeleton className="h-8 w-40" />
            <div className="flex w-full flex-col gap-6 lg:max-w-[350px] lg:min-w-[350px] xl:max-w-[408px] xl:min-w-[408px]">
              {Array.from({ length: 3 }, (_, index) => (
                <JobCardSkeleton key={index} isButtonLink={false} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
