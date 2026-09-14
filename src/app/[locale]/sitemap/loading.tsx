import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <section
      className="flex flex-col gap-6 px-4 py-12"
      aria-busy="true"
      aria-label="Loading sitemap"
    >
      {Array.from({ length: 8 }, (_, index) => (
        <Skeleton key={index} className="h-5 w-2/3" />
      ))}
    </section>
  );
}
