'use client';
import { cn } from '@/libs/utils';

import BodyText from './BodyText';

interface IListProps {
  format?: string;
  children?: React.ReactNode;
  className?: string;
}
export const List: React.FC<IListProps> = ({ children, format, className }) => {
  return (
    <div>
      {format === 'ordered' ? (
        <BodyText
          asChild
          variant="sm"
          className={cn('list-decimal pl-5 lg:text-base', className)}
        >
          <ol>{children}</ol>
        </BodyText>
      ) : (
        <BodyText
          asChild
          variant="sm"
          className={cn('list-disc pl-5 leading-4 lg:text-base', className)}
        >
          <ul>{children}</ul>
        </BodyText>
      )}
    </div>
  );
};
