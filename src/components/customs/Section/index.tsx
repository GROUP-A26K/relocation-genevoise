import { cn } from '@/libs/utils';

import type { FC } from 'react';

interface ISectionProps
  extends React.PropsWithChildren, React.HTMLAttributes<HTMLElement> {
  isDivider?: boolean;
  className?: string;
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
  childrenProps?: React.HTMLAttributes<HTMLElement>;
  dividerProps?: React.HTMLAttributes<HTMLElement>;
}

const Section: FC<ISectionProps> = ({
  children,
  isDivider,
  className,
  wrapperProps,
  childrenProps,
  dividerProps,
  ...props
}) => {
  const { className: wrapperClassname, ...restWrapperProps } =
    wrapperProps ?? {};

  const { className: childrenClassname, ...restChildrenProps } =
    childrenProps ?? {};

  const { className: dividerClassname, ...restDividerProps } =
    dividerProps ?? {};

  return (
    <section
      className={cn(
        'flex flex-col items-center justify-center text-black-500',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'container w-full max-w-(--breakpoint-2xl) px-4 pt-12',
          'lg:px-[48px] 2xl:px-[100px] 2xl:pt-16',
          wrapperClassname
        )}
        {...restWrapperProps}
      >
        <div
          className={cn('flex flex-col gap-12 xl:gap-16', childrenClassname)}
          {...restChildrenProps}
        >
          {children}
        </div>
        <div
          className={cn(
            'pt-12',
            '2xl:pt-16',
            {
              'border-b border-grey-50': isDivider,
            },
            dividerClassname
          )}
          {...restDividerProps}
        />
      </div>
    </section>
  );
};

export default Section;
