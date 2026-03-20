import { type ReactNode, type FC } from 'react';

import { cn } from '@/libs/utils';

interface Props {
  children: ReactNode;
  isDivider?: boolean;
  className?: string;
}
const Section: FC<Props> = ({ children, isDivider, className }) => {
  return (
    <section
      className={cn(
        'flex flex-col justify-center items-center text-black-500',
        className
      )}
    >
      <div
        className={cn(
          'container pt-12 w-full max-w-screen-2xl px-4',
          '2xl:pt-16 2xl:px-[100px] lg:px-[48px]'
        )}
      >
        <div className="flex flex-col 2xl:gap-16 gap-12">{children}</div>
        <div
          className={`2xl:pt-16 pt-12 ${isDivider && 'border-b border-grey-50'}`}
        />
      </div>
    </section>
  );
};
export default Section;