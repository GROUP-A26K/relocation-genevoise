import type { FC } from 'react';

interface Props {
  children?: React.ReactNode;
}
export const BoldText: FC<Props> = ({ children }) => {
  return (
    <span className="p-0 text-sm leading-[130%]! font-semibold text-black-200 lg:text-base">
      {children}
    </span>
  );
};
