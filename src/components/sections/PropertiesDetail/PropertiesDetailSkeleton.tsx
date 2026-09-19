import { cn } from '@/libs/utils';
import { Skeleton } from '@/components/ui/skeleton';
import SectionSkeleton from '@/components/common/Section/SectionSkeleton';
import PropertyCardSkeleton from '@/components/common/Card/PropertyCardSkeleton';

import { PropertyDetailContainer } from './PropertyDetailContainer';

const ImagePreviewSkeleton = () => (
  <div className="relative grid w-full grid-cols-1 gap-2 overflow-hidden lg:grid-cols-2 lg:rounded-3xl">
    <div className="relative h-0 w-full pb-[68%]">
      <Skeleton className="absolute inset-0 rounded-2xl lg:rounded-none" />
    </div>
    <div className="grid grid-cols-4 gap-2 lg:grid-cols-2 lg:grid-rows-2">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="relative h-0 w-full pb-[68%]">
          <Skeleton className="absolute inset-0 rounded-lg lg:rounded-none" />
        </div>
      ))}
    </div>
  </div>
);

interface ITableSkeletonProps {
  columns: 2 | 3;
  rows: number;
}

const TableSkeleton = ({ columns, rows }: ITableSkeletonProps) => (
  <div className="overflow-hidden rounded-2xl border border-gray-100">
    <div
      className={cn(
        '-mr-px -mb-px grid grid-cols-1',
        columns === 3 ? 'sm:grid-cols-2 xl:grid-cols-3' : 'sm:grid-cols-2'
      )}
    >
      {Array.from({ length: columns * rows }, (_, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-4 border-r border-b border-gray-100 p-6"
        >
          <div className="flex items-center gap-2">
            <Skeleton className="size-5 rounded-md" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-10" />
        </div>
      ))}
    </div>
  </div>
);

const DetailSectionSkeleton = ({
  children,
  hasTitle = true,
}: React.PropsWithChildren<{ hasTitle?: boolean }>) => (
  <div className="flex flex-col gap-6">
    {hasTitle && <Skeleton className="h-8 w-48" />}
    <div className="w-full">{children}</div>
  </div>
);

export const PropertyDetailsViewSkeleton = () => {
  return (
    <div aria-busy="true" aria-label="Loading property">
      <SectionSkeleton isDivider className="w-full">
        <div className="flex w-full flex-col items-center justify-center gap-12 xl:gap-16">
          <ImagePreviewSkeleton />
          <PropertyDetailContainer>
            <div className="flex flex-col gap-12 lg:col-span-8 lg:gap-16">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-5 w-24" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-[6px]" />
                      <Skeleton className="h-6 w-24 rounded-[6px]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 py-1">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-1/2" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Skeleton className="size-4 rounded-full" />
                    <Skeleton className="h-4 w-56" />
                  </div>
                </div>
                <Skeleton className="h-[39px] w-44" />
              </div>

              <DetailSectionSkeleton>
                <TableSkeleton columns={3} rows={3} />
              </DetailSectionSkeleton>
              <DetailSectionSkeleton>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-3/4" />
                  </div>
                  <Skeleton className="h-5 w-24" />
                </div>
              </DetailSectionSkeleton>
              <DetailSectionSkeleton>
                <TableSkeleton columns={2} rows={3} />
              </DetailSectionSkeleton>
            </div>

            <div className="flex w-full flex-col gap-8 lg:col-span-4">
              <DetailSectionSkeleton>
                <Skeleton className="h-[230px] w-full rounded-2xl" />
              </DetailSectionSkeleton>
              <DetailSectionSkeleton hasTitle={false}>
                <div className="flex flex-col gap-4 rounded-3xl border border-yellow-100 bg-yellow-25 p-6 lg:gap-6">
                  <Skeleton className="h-7 w-36 lg:h-8" />
                  <div className="flex items-center gap-6">
                    <Skeleton className="size-[60px] shrink-0 rounded-full lg:size-20" />
                    <div className="flex min-w-0 flex-col gap-2 lg:gap-3">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-7 w-36" />
                    </div>
                  </div>
                  <Skeleton className="h-11 w-full rounded-full" />
                </div>
              </DetailSectionSkeleton>
            </div>
          </PropertyDetailContainer>
        </div>
      </SectionSkeleton>

      <SectionSkeleton>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex w-full max-w-3xl flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-[18px] w-28" />
              <Skeleton className="h-[39px] w-80 max-w-full" />
            </div>
            <Skeleton className="h-[18px] w-full max-w-lg" />
          </div>
          <Skeleton className="h-10 w-40 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </SectionSkeleton>
    </div>
  );
};
