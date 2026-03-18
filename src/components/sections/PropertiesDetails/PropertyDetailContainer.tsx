import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

export const PropertyDetailContainer: FC<Props> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 lg:gap-16 gap-12">
      {children}
    </div>
  );
};
