import type { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const ContentContainer: FC<Props> = ({ children }) => (
  <div className="bg-white pb-8">
    {/* Decorative top banner */}
    <div className="h-[303px] bg-secondary-25 pb-8 lg:pb-12" />

    <div className="relative mt-[-300px] flex flex-col items-center">
      {children}
    </div>
  </div>
);

export default ContentContainer;
