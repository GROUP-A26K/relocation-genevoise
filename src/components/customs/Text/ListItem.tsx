'use client';
import { cn } from '@/libs/utils';
import { type FC } from 'react';

interface Props {
  children?: React.ReactNode;
  className?: string;
  dotColor?: string; // Add a prop to allow customization of the dot color
}

export const ListItem: FC<Props> = ({ children, className, dotColor }) => {
  return (
    <li
      className={cn(
        'text-black-200 lg:text-base text-sm font-normal !leading-[130%]',
        className
      )}
    >
      <style jsx>{`
        li::marker {
          color: ${dotColor || '#4e5561'};
        }
      `}</style>
      {children}
    </li>
  );
};
