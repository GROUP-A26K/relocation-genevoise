import { type FC } from 'react';

interface Props {
  children?: React.ReactNode;
}
export const Paragraph: FC<Props> = ({ children }) => {
  return (
    <span className="text-black-200 lg:text-base text-sm font-normal !leading-[130%] p-0">
      {children}
    </span>
  );
};
