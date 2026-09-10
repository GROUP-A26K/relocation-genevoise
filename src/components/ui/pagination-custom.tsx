import * as React from 'react';
import { useLocale } from 'next-intl';
import { ArrowLeft, ArrowRight, MoreHorizontal } from 'lucide-react';

import { cn } from '@/libs/utils';
import {
  type ButtonProps,
  buttonVariants,
} from '@/components/ui/button-custom';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1', className)}
      {...props}
    />
  );
}
function PaginationItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li data-slot="pagination-item" className={cn('', className)} {...props} />
  );
}
type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? 'page' : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? 'outline' : 'ghost',
        size,
      }),
      'font-normal text-black-300',
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const locale = useLocale();
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        'gap-1 pl-2.5 leading-[130%]! font-semibold text-black-500',
        className
      )}
      {...props}
    >
      <ArrowLeft strokeWidth={3} className="h-3! w-3!" />
      <span>{locale === 'en' ? 'Previous' : 'Anterior'}</span>
    </PaginationLink>
  );
};
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  const locale = useLocale();
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        'gap-1 pr-2.5 leading-[130%]! font-semibold text-black-500',
        className
      )}
      {...props}
    >
      <span>{locale === 'en' ? 'Next' : 'Siguiente'}</span>
      <ArrowRight strokeWidth={3} className="h-3! w-3!" />
    </PaginationLink>
  );
};
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex size-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-3! w-3!" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
