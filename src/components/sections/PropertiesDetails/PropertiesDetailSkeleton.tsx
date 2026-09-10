import { Skeleton } from '@/components/ui/skeleton';

import { PropertyDetailContainer } from './PropertyDetailContainer';

const ImagePreviewSkeleton = () => {
  return (
    <div className="relative grid w-full grid-cols-1 gap-2 overflow-hidden lg:grid-cols-2 lg:rounded-3xl">
      <div className="relative h-0 w-full pb-[68%]">
        <Skeleton className="absolute inset-0 rounded-2xl lg:rounded-none" />
      </div>
      <div className="grid grid-cols-4 gap-2 lg:grid-cols-2 lg:grid-rows-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative h-0 w-full pb-[68%]">
            <Skeleton className="absolute inset-0 rounded-lg lg:rounded-none" />
          </div>
        ))}
      </div>
      <Skeleton className="absolute right-4 bottom-4 hidden h-10 w-40 rounded-full lg:block" />
    </div>
  );
};

type TableSkeletonProps = {
  columns: number;
  rows: number;
};

const TableSkeleton = ({ columns, rows }: TableSkeletonProps) => {
  const skeletonCount = columns * rows;
  const smCols = Math.min(columns, 2);
  const xlCols = columns;
  const smGridColsClass = smCols === 1 ? 'sm:grid-cols-1' : 'sm:grid-cols-2';
  const xlGridColsClass =
    xlCols === 1
      ? 'xl:grid-cols-1'
      : xlCols === 2
        ? 'xl:grid-cols-2'
        : 'xl:grid-cols-3';
  const gridCols = `grid-cols-1 ${smGridColsClass} ${xlGridColsClass}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <ul className={`grid ${gridCols}`}>
        {Array.from({ length: skeletonCount }).map((_, idx) => {
          const smRowCount = Math.ceil(skeletonCount / smCols);
          const smColIndex = idx % smCols;
          const smRowIndex = Math.floor(idx / smCols);
          const isLastColSm = smColIndex === smCols - 1;
          const isLastRowSm = smRowIndex === smRowCount - 1;

          const xlRowCount = Math.ceil(skeletonCount / xlCols);
          const xlColIndex = idx % xlCols;
          const xlRowIndex = Math.floor(idx / xlCols);
          const isLastColXl = xlColIndex === xlCols - 1;
          const isLastRowXl = xlRowIndex === xlRowCount - 1;

          return (
            <li
              key={idx}
              className={[
                'border-gray-100 p-6',
                idx < skeletonCount - 1 ? 'border-b' : '',
                !isLastColSm ? 'sm:border-r' : 'sm:border-r-0',
                !isLastRowSm ? 'sm:border-b' : 'sm:border-b-0',
                !isLastColXl ? 'xl:border-r' : 'xl:border-r-0',
                !isLastRowXl ? 'xl:border-b' : 'xl:border-b-0',
              ].join(' ')}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded-md xl:h-6 xl:w-6" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const MapSkeleton = () => (
  <div className="overflow-hidden rounded-2xl">
    <Skeleton className="h-[240px] w-full rounded-none" />
    <div className="flex flex-col items-start justify-between gap-4 rounded-b-2xl border border-gray-100 p-6 lg:flex-row lg:items-center">
      <div className="mb-4 flex w-full min-w-0 flex-1 flex-col gap-2 lg:mb-0">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-4 w-32 min-w-0" />
      </div>
      <div className="w-full lg:w-auto">
        <Skeleton className="h-12 w-full rounded-full lg:w-36" />
      </div>
    </div>
  </div>
);

const AgentSkeleton = () => (
  <div className="relative overflow-hidden rounded-3xl border border-yellow-100 bg-yellow-25 p-6">
    <div className="flex flex-col gap-4 lg:gap-6">
      <Skeleton className="h-6 w-36" />
      <div className="flex items-center gap-6">
        <Skeleton className="h-[60px] w-[60px] rounded-full lg:h-20 lg:w-20" />
        <div className="flex flex-col gap-2 lg:gap-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-32 min-w-0" />
        </div>
      </div>
      <Skeleton className="h-12 w-full rounded-full" />
    </div>
  </div>
);

const DescriptionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="mt-1 h-4 w-24" />
  </div>
);

const SectionSkeleton = ({ content }: { content: React.ReactNode }) => (
  <div className="flex flex-col gap-6">
    <Skeleton className="h-8 w-40" />
    <div className="w-full">{content}</div>
  </div>
);

export const PropertyDetailsViewSkeleton = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center">
      <div className="flex w-full max-w-(--breakpoint-2xl) flex-col items-center gap-12 px-4 pt-12 lg:px-[48px] 2xl:gap-16 2xl:px-[100px] 2xl:pt-16">
        <ImagePreviewSkeleton />
        <PropertyDetailContainer>
          {/* Left Column */}
          <div className="flex flex-col gap-12 lg:col-span-8 lg:gap-16">
            {/* Header */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-20 rounded-[6px]" />
                    <Skeleton className="h-6 w-24 rounded-[6px]" />
                  </div>
                </div>
                <Skeleton className="h-9 w-3/4" />
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>

            <SectionSkeleton content={<TableSkeleton columns={3} rows={3} />} />
            <SectionSkeleton content={<DescriptionSkeleton />} />
            <SectionSkeleton content={<TableSkeleton columns={2} rows={2} />} />
          </div>

          <div className="flex w-full flex-col gap-8 lg:col-span-4">
            <SectionSkeleton content={<MapSkeleton />} />
            <SectionSkeleton content={<AgentSkeleton />} />
          </div>
        </PropertyDetailContainer>
      </div>
    </section>
  );
};
