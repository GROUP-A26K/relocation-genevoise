import { Link } from '@/libs/i18nNavigation';

import type { FC } from 'react';

interface Props {
  link?: string;
  children?: React.ReactNode;
}
export const LinkText: FC<Props> = ({ children, link }) => {
  return (
    <span className="p-0 leading-[130%]! font-semibold text-secondary-600">
      <Link href={link ?? ''} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    </span>
  );
};
