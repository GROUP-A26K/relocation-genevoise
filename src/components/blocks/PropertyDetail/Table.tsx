import { cn } from '@/libs/utils';

type Item = {
  label?: string;
  value?: string | number;
  icon?: string;
  unit?: string;
};

interface Props {
  items: Item[];
  iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;
  columns?: number;
}

/**
 * Pads count up to the nearest multiple of `cols`.
 * e.g. padTo(7, 3) → 9, padTo(6, 3) → 6
 */
const padTo = (count: number, cols: number) => Math.ceil(count / cols) * cols;

export const PropertyDetailTable = ({ items, iconMap, columns = 3 }: Props) => {
  const gridCols =
    {
      1: 'grid-cols-1',
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
    }[columns] ?? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3';

  const smTotal = columns >= 2 ? padTo(items.length, 2) : items.length;
  const xlTotal = columns >= 3 ? padTo(items.length, columns) : smTotal;
  const ghostCount = Math.max(smTotal, xlTotal) - items.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <div className={cn('grid', gridCols, '-mr-px -mb-px')}>
        {items.map((item, idx) => {
          const Icon = item.icon ? iconMap[item.icon] : null;
          return (
            <div key={idx} className="border-r border-b border-gray-100 p-6">
              {item.label && (
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-black-500">
                    {Icon && (
                      <Icon
                        className="h-5 w-5 text-blue-500"
                        strokeWidth={2.5}
                      />
                    )}
                    <span className="text-base leading-[130%] font-normal">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-base leading-[130%] font-semibold text-black-500">
                    {item.value}
                    {item.unit ? ` ${item.unit}` : ''}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {Array.from({ length: ghostCount }, (_, i) => {
          const needsAtSm = items.length + i < smTotal;
          return (
            <div
              key={`ghost-${i}`}
              className={cn(
                'border-r border-b border-gray-100 p-6',
                needsAtSm ? 'hidden sm:block' : 'hidden xl:block'
              )}
              aria-hidden="true"
            />
          );
        })}
      </div>
    </div>
  );
};
