'use client';
import { cn } from '@/libs/utils';

import type { FC } from 'react';

interface Props {
  format?: string;
  children?: React.ReactNode;
  className?: string;
}
export const List: FC<Props> = ({ children, format, className }) => {
  return (
    <div>
      {format === 'ordered' ? (
        <ol
          className={cn(
            'list-decimal pl-5 text-sm leading-[130%]! font-normal text-black-200 lg:text-base',
            className
          )}
        >
          {children}
        </ol>
      ) : (
        <ul
          className={cn(
            'list-disc pl-5 text-sm leading-4! font-normal text-black-200 lg:text-base',
            className
          )}
        >
          {children}
        </ul>
      )}
    </div>
  );
};
