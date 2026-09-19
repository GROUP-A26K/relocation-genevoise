import { RevealSection } from '@/components/common/Reveal';

import type { ReactNode } from 'react';

interface IContentContainerProps {
  children: ReactNode;
}

const ContentContainer: React.FC<IContentContainerProps> = ({ children }) => (
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
