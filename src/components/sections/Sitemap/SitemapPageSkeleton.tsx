import { Skeleton } from '@/components/ui/skeleton';

const MENU_ITEM_WIDTHS = ['w-16', 'w-20', 'w-10', 'w-24'];
const SECTION_ITEM_COUNTS = [11, 3, 6, 6];
const ITEM_WIDTHS = ['w-40', 'w-56', 'w-32', 'w-64', 'w-48', 'w-36'];

export function SitemapPageSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading sitemap"
      className="relative flex flex-col items-center justify-center"
    >
      <div className="container px-4 pb-14 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] lg:pb-16 xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
        <div className="flex w-full flex-col items-center gap-3 py-16">
          <Skeleton className="h-[18px] w-20" />
          <Skeleton className="h-9 w-72 max-w-full lg:h-[62px] lg:w-96" />
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="hidden h-fit lg:flex xl:w-[228px]">
            <ul className="flex w-full flex-col gap-1 border-l-2 border-grey-50">
              {MENU_ITEM_WIDTHS.map((width) => (
                <li key={width} className="px-4 py-3">
                  <Skeleton className={`h-[21px] ${width}`} />
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-3 lg:hidden">
            <Skeleton className="h-10 w-full rounded-full" />
          </div>

          <div className="flex flex-col items-center justify-center">
            <div className="mx-auto flex w-full max-w-[720px] flex-col gap-8 lg:mx-0 lg:max-w-[470px] xl:max-w-[620px] 2xl:max-w-[720px]">
              {SECTION_ITEM_COUNTS.map((count, sectionIndex) => (
                <div key={sectionIndex} className="flex flex-col gap-4">
                  <Skeleton className="h-[26px] w-32 lg:h-[31px]" />
                  <ul className="flex flex-col gap-4">
                    {Array.from({ length: count }, (_, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Skeleton className="size-2 shrink-0 rounded-full" />
                        <Skeleton
                          className={`h-4 max-w-full ${ITEM_WIDTHS[index % ITEM_WIDTHS.length]}`}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
