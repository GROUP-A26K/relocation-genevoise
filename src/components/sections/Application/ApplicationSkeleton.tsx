import { Skeleton } from '@/components/ui/skeleton';

export function ApplicationSkeleton() {
  return (
    <section
      className="flex flex-col gap-8 px-4 py-12 lg:px-16"
      aria-busy="true"
      aria-label="Loading application form"
    >
      <Skeleton className="h-8 w-2/3" />
      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <Skeleton key={index} className="h-12 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-32 w-full rounded-lg" />
    </section>
  );
}
