import { Link } from '@/libs/i18nNavigation';
import { type FC } from 'react';

interface Props {
  link?: string;
  children?: React.ReactNode;
}
export const LinkText: FC<Props> = ({ children, link }) => {
  return (
    <span className="text-secondary-500 font-semibold !leading-[130%] p-0">
      <Link href={link ?? ''} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </span>
  );
};
