import { type FC } from 'react';

interface Props {
  children?: React.ReactNode;
}
export const BoldText: FC<Props> = ({ children }) => {
  return (
    <span className="text-black-200 lg:text-base text-sm font-semibold !leading-[130%] p-0">
      {children}
    </span>
  );
};
