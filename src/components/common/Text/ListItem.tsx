'use client';
import { cn } from '@/libs/utils';

interface IListItemProps {
  children?: React.ReactNode;
  className?: string;
  dotColor?: string; // Add a prop to allow customization of the dot color
}

export const ListItem: React.FC<IListItemProps> = ({
  children,
  className,
  dotColor,
}) => {
  return (
    <li
      className={cn(
        'text-sm leading-[130%]! font-normal text-black-200 lg:text-base',
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
