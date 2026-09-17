'use client';
import { cn } from '@/libs/utils';

import BodyText from './BodyText';

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
    <BodyText asChild variant="sm" className={cn('lg:text-base', className)}>
      <li>
        <style jsx>{`
          li::marker {
            color: ${dotColor || '#4e5561'};
          }
        `}</style>
        {children}
      </li>
    </BodyText>
  );
};
