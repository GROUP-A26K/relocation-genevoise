import { cn } from '@/libs/utils';

interface ISectionSkeletonProps extends React.PropsWithChildren {
  isDivider?: boolean;
  className?: string;
  childrenClassName?: string;
  dividerClassName?: string;
}

export default function SectionSkeleton({
  children,
  isDivider,
  className,
  childrenClassName,
  dividerClassName,
}: ISectionSkeletonProps) {
  return (
    <section
      className={cn('flex flex-col items-center justify-center', className)}
    >
      <div className="container w-full max-w-(--breakpoint-2xl) px-4 pt-12 lg:px-12 2xl:px-25 2xl:pt-16">
        <div
          className={cn('flex flex-col gap-12 xl:gap-16', childrenClassName)}
        >
          {children}
        </div>
        <div
          className={cn(
            'pt-12 2xl:pt-16',
            isDivider && 'border-b border-grey-50',
            dividerClassName
          )}
        />
      </div>
    </section>
  );
}
