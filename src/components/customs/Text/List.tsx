'use client';
import { cn } from '@/libs/utils';
import { type FC } from 'react';

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
            'text-black-200 lg:text-base text-sm font-normal !leading-[130%] list-decimal pl-5',
            className
          )}
        >
          {children}
        </ol>
      ) : (
        <ul
          className={cn(
            'text-black-200 lg:text-base text-sm font-normal !leading-4 list-disc pl-5',
            className
          )}
        >
          {children}
        </ul>
      )}
    </div>
  );
};
