import { Skeleton } from "@/components/ui/skeleton";
import { PropertyDetailContainer } from "./PropertyDetailContainer";
import { PropertyDetailSection } from "./PropertiesDetailSection";

const ImagePreviewSkeleton = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:rounded-3xl overflow-hidden">
      <Skeleton className="relative aspect-[1/0.68] w-full h-full rounded-2xl xl:rounded-none" />
      <div className="grid grid-cols-4 xl:grid-cols-2 grid-rows-1 xl:grid-rows-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            className="relative aspect-[1/0.68] w-full h-full rounded-lg xl:rounded-none"
          />
        ))}
      </div>
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
  const smGridColsClass = smCols === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2";
  const xlGridColsClass =
    xlCols === 1 ? "xl:grid-cols-1" : xlCols === 2 ? "xl:grid-cols-2" : "xl:grid-cols-3";
  const gridCols = `grid-cols-1 ${smGridColsClass} ${xlGridColsClass}`;

  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden">
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
                "p-6 border-gray-100",
                idx < skeletonCount - 1 ? "border-b" : "",
                !isLastColSm ? "sm:border-r" : "sm:border-r-0",
                !isLastRowSm ? "sm:border-b" : "sm:border-b-0",
                !isLastColXl ? "xl:border-r" : "xl:border-r-0",
                !isLastRowXl ? "xl:border-b" : "xl:border-b-0"
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-5 h-5 xl:w-6 xl:h-6 rounded-md" />
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
    <Skeleton className="w-full h-[240px] rounded-none" />
    <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between p-6 gap-4 border border-gray-100 rounded-b-2xl">
      <div className="flex-1 min-w-0 w-full flex flex-col gap-2 mb-4 lg:mb-0">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-4 w-32 min-w-0" />
      </div>
      <div className="w-full lg:w-auto">
        <Skeleton className="w-full lg:w-36 h-12 rounded-full" />
      </div>
    </div>
  </div>
);

const AgentSkeleton = () => (
  <div className="relative rounded-3xl border border-yellow-100 overflow-hidden bg-yellow-25 p-6">
    <div className="flex flex-col gap-4 lg:gap-6">
      <Skeleton className="h-6 w-36" />
      <div className="flex items-center gap-6">
        <Skeleton className="w-[60px] h-[60px] lg:w-20 lg:h-20 rounded-full" />
        <div className="flex flex-col gap-2 lg:gap-3">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-6 w-32 min-w-0" />
        </div>
      </div>
      <Skeleton className="w-full h-12 rounded-full" />
    </div>
  </div>
);

const DescriptionSkeleton = () => (
  <div className="flex flex-col gap-2">
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-24 mt-1" />
  </div>
);

export const PropertyDetailsViewSkeleton = () => {
  return (
    <section className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center py-12 lg:py-16 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4 gap-12 lg:gap-16 max-w-screen-2xl w-full">
        <ImagePreviewSkeleton />
        <PropertyDetailContainer>
          {/* Left Column */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-8 w-3/4" />
                <div className="flex gap-1.5 items-center">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-5 w-16" />
              </div>
            </div>

            <PropertyDetailSection
              title="&nbsp;"
              content={<TableSkeleton columns={3} rows={3} />}
            />

            <PropertyDetailSection
              title="&nbsp;"
              content={<DescriptionSkeleton />}
            />

            <PropertyDetailSection
              title="&nbsp;"
              content={<TableSkeleton columns={2} rows={2} />}
            />
          </div>

          <div className="w-full lg:col-span-4 gap-8 flex flex-col">
            <PropertyDetailSection
              title="&nbsp;"
              content={<MapSkeleton />}
            />
            <PropertyDetailSection
              title="&nbsp;"
              content={<AgentSkeleton />}
            />
          </div>
        </PropertyDetailContainer>
      </div>
    </section>
  );
};
