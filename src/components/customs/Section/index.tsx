import { cn } from '@/libs/utils';
import {
  RevealSection,
  type TRevealTrigger,
} from '@/components/customs/Reveal';

import type { HTMLMotionProps } from 'motion/react';

interface ISectionProps
  extends React.PropsWithChildren, React.HTMLAttributes<HTMLElement> {
  isDivider?: boolean;
  className?: string;
  wrapperProps?: React.HTMLAttributes<HTMLElement>;
  childrenProps?: Omit<HTMLMotionProps<'div'>, 'children'>;
  dividerProps?: React.HTMLAttributes<HTMLElement>;
  revealOnce?: boolean;
  revealTrigger?: TRevealTrigger;
}

const Section: React.FC<ISectionProps> = ({
  children,
  isDivider,
  className,
  wrapperProps,
  childrenProps,
  dividerProps,
  revealOnce,
  revealTrigger,
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
          'lg:px-12 2xl:px-25 2xl:pt-16',
          wrapperClassname
        )}
        {...restWrapperProps}
      >
        <RevealSection
          once={revealOnce}
          trigger={revealTrigger}
          className={cn('flex flex-col gap-12 xl:gap-16', childrenClassname)}
          {...restChildrenProps}
        >
          {children}
        </RevealSection>
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
