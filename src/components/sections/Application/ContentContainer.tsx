import { RevealSection } from '@/components/customs/Reveal';

import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ContentContainer: FC<Props> = ({ children }) => (
  <div className="bg-white pb-8">
    {/* Decorative top banner */}
    <div className="h-[303px] bg-secondary-25 pb-8 lg:pb-12" />

    <RevealSection
      trigger="load"
      className="relative mt-[-300px] flex flex-col items-center"
    >
      {children}
    </RevealSection>
  </div>
);

export default ContentContainer;
