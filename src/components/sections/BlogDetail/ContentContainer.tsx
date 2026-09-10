import { cn } from '@/libs/utils';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-black-500">
      <div
        className={cn(
          'relative container flex flex-col gap-8 px-4 pt-0 pb-14',
          'lg:flex-row lg:px-[48px] lg:pt-8 lg:pb-16',
          'xl:max-w-(--breakpoint-xl) xl:px-[100px]',
          '2xl:max-w-(--breakpoint-2xl)',
          'md:max-w-(--breakpoint-md)'
        )}
      >
        {children}
      </div>
    </section>
  );
};
