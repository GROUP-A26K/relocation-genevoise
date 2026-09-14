import { Skeleton } from '@/components/ui/skeleton';
import TabsSkeleton from '@/components/blocks/TabsMenu/TabsSkeleton';
import SectionSkeleton from '@/components/customs/Section/SectionSkeleton';

import { CareerListSkeleton } from './CareerListSkeleton';

export function CareerPageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading careers">
      <SectionSkeleton>
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-4xl flex-col items-center gap-4 lg:gap-6">
            <div className="flex w-full flex-col items-center gap-3">
              <Skeleton className="h-[18px] w-14" />
              <Skeleton className="h-[62px] w-72 max-w-full" />
            </div>
            <Skeleton className="h-[18px] w-full max-w-xl" />
          </div>
        </div>
      </SectionSkeleton>

      <section className="flex flex-col items-center justify-center">
        <div className="container px-4 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
          <div className="flex justify-center overflow-hidden">
            <TabsSkeleton count={2} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto flex w-full max-w-[768px] flex-col lg:mx-0 xl:max-w-[660px] 2xl:max-w-[768px]">
              <CareerListSkeleton />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
