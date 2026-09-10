import type { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

export const PropertyDetailContainer: FC<Props> = ({ children }) => {
  return (
    <div className="grid w-full grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
      {children}
    </div>
  );
};
