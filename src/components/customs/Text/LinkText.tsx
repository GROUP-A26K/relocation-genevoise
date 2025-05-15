import Link from 'next/link';
import { type FC } from 'react';

interface Props {
  link?: string;
  children?: React.ReactNode;
}
export const LinkText: FC<Props> = ({ children, link }) => {
  return (
    <span className="text-primary-500 font-semibold !leading-[130%] p-0">
      <Link href={link ?? ''}>{children}</Link>
    </span>
  );
};
