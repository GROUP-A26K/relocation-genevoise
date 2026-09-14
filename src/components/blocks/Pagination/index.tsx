import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/libs/utils';
import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import type { Meta } from '@/models/Meta';

interface IPaginationProps {
  meta: Meta;
  className?: string;
  onClick: (value: number) => void;
  getPageHref: (value: number) => string;
}

const pageItemClassName =
  'h-10 w-10 p-0 rounded-full flex items-center justify-center font-semibold';

export const Pagination: React.FC<IPaginationProps> = ({
  meta,
  className,
  onClick,
  getPageHref,
}) => {
  const currentPage = meta.pagination.page;

  if (meta.pagination.pageCount <= 1) return null;

  const handleTabClick = (value: number) => {
    onClick(value);
  };

  const linkProps = (page: number) => ({
    href: getPageHref(page),
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      handleTabClick(page);
    },
  });

  const generatePaginationLinks = (current: number, max: number) => {
    if (!current || !max) return null;

    const items = [
      <PaginationItem key={1} className="cursor-pointer">
        <PaginationLink
          {...linkProps(1)}
          className={cn(
            pageItemClassName,
            meta.pagination.page === 1 &&
              'border-0 bg-secondary-500 text-black-500! hover:bg-secondary-500 active:bg-secondary-500'
          )}
          isActive={meta.pagination.page === 1}
        >
          {1}
        </PaginationLink>
      </PaginationItem>,
    ];

    if (current === 1 && max === 1) return items;
    if (current > 4) items.push(<PaginationEllipsis key="right" />);

    const r: number = 2;
    const r1: number = current - r;
    const r2: number = current + r;

    for (let i = Math.max(r1, 2); i <= Math.min(max, r2); i++) {
      items.push(
        <PaginationItem key={i} className="cursor-pointer">
          <PaginationLink
            {...linkProps(i)}
            className={cn(
              pageItemClassName,
              meta.pagination.page === i &&
                'border-0 bg-secondary-500 text-black-500! hover:bg-secondary-500 active:bg-secondary-500'
            )}
            isActive={meta.pagination.page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (r2 + 1 < max) items.push(<PaginationEllipsis key="right" />);
    if (r2 < max)
      items.push(
        <PaginationItem key={max} className="cursor-pointer">
          <PaginationLink
            {...linkProps(max)}
            className={cn(
              pageItemClassName,
              meta.pagination.page === max &&
                'border-0 bg-secondary-500 text-black-500! hover:bg-secondary-500 active:bg-secondary-500'
            )}
            isActive={meta.pagination.page === max}
          >
            {max}
          </PaginationLink>
        </PaginationItem>
      );

    return items || [];
  };

  return (
    <PaginationShadcn className={cn('w-full', className)}>
      {/* Desktop */}
      <PaginationContent className="hidden w-full flex-row justify-between border-t border-t-grey-100 lg:flex lg:pt-8">
        <PaginationItem>
          <PaginationPrevious
            {...(currentPage > 1 ? linkProps(currentPage - 1) : {})}
            className={cn('cursor-pointer', currentPage === 1 && 'invisible')}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage > 1) {
                handleTabClick(currentPage - 1);
              }
            }}
          />
        </PaginationItem>
        <div className="flex">
          {generatePaginationLinks(
            meta.pagination.page,
            meta.pagination.pageCount
          )}
        </div>
        <PaginationItem>
          <PaginationNext
            {...(currentPage < meta.pagination.pageCount
              ? linkProps(currentPage + 1)
              : {})}
            className={cn(
              'cursor-pointer',
              currentPage === meta.pagination.pageCount && 'invisible',
              meta.pagination.pageCount === 0 && 'invisible'
            )}
            onClick={(event) => {
              event.preventDefault();
              if (currentPage < meta.pagination.pageCount) {
                handleTabClick(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>

      {/* Mobile */}
      <PaginationContent className="flex w-full flex-row justify-between border-t border-t-grey-100 pt-8 lg:hidden">
        <PaginationItem>
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border p-2 lg:p-3"
            onClick={() => {
              if (currentPage > 1) {
                handleTabClick(currentPage - 1);
              }
            }}
          >
            <ChevronLeft className="h-5 w-5 text-black-500" />
          </div>
        </PaginationItem>
        <div className="flex items-center justify-center text-sm leading-[130%]! font-normal text-black-200">
          Page {currentPage} of {meta.pagination.pageCount}
        </div>
        <PaginationItem>
          <div
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border p-2 lg:p-3"
            onClick={() => {
              if (currentPage < meta.pagination.pageCount) {
                handleTabClick(currentPage + 1);
              }
            }}
          >
            <ChevronRight className="h-5 w-5 text-black-500" />
          </div>
        </PaginationItem>
      </PaginationContent>
    </PaginationShadcn>
  );
};
