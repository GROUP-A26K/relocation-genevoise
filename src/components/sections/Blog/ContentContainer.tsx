import { RevealSection } from '@/components/customs/Reveal';

import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const ContentContainer: FC<Props> = ({ children }) => {
  return (
    <section className="relative flex flex-col items-center justify-center text-black-500">
      <RevealSection className="container px-4 pt-12 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) lg:px-[48px] lg:pt-8 xl:max-w-(--breakpoint-xl) xl:px-[100px] 2xl:max-w-(--breakpoint-2xl)">
        {children}
      </RevealSection>
    </section>
  );
};
