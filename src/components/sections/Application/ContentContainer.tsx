import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ContentContainer: FC<Props> = ({ children }) => (
  <div className="bg-white pb-8">
    {/* Decorative top banner */}
    <div className="bg-secondary-25 lg:pb-12 pb-8 h-[303px]" />

    <div className="relative flex flex-col items-center mt-[-300px]">
      {children}
    </div>
  </div>
);

export default ContentContainer;
