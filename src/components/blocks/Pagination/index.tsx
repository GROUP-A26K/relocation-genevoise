import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination-custom';
import { cn } from '@/libs/utils';
import { Meta } from '@/models/Meta';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';

interface Props {
  meta: Meta;
  onClick: (value: number) => void;
}
export const Pagination: FC<Props> = (props) => {
  const currentPage = props.meta.pagination.page;

  const handleTabClick = (value: number) => {
    props.onClick(value);
  };

  const generatePaginationLinks = (current: number, max: number) => {
    if (!current || !max) return null;

    const items = [
      <PaginationItem
        key={1}
        onClick={() => handleTabClick(1)}
        className="cursor-pointer"
      >
        <PaginationLink
          className={cn(
            'rounded-full',
            props.meta.pagination.page === 1 &&
              'border-0 !text-primary-500 bg-primary-50 hover:bg-primary-50 active:bg-primary-50'
          )}
          isActive={props.meta.pagination.page === 1}
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

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
      items.push(
        <PaginationItem
          key={i}
          onClick={() => handleTabClick(i)}
          className="cursor-pointer"
        >
          <PaginationLink
            className={cn(
              'rounded-full',
              props.meta.pagination.page === i &&
                'border-0 !text-primary-500 bg-primary-50 hover:bg-primary-50 active:bg-primary-50'
            )}
            isActive={props.meta.pagination.page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (r2 + 1 < max) items.push(<PaginationEllipsis key="right" />);
    if (r2 < max)
      items.push(
        <PaginationItem
          key={max}
          onClick={() => handleTabClick(max)}
          className="cursor-pointer"
        >
          <PaginationLink
            className={cn(
              'rounded-full',
              props.meta.pagination.page === max &&
                'border-0 !text-primary-500 bg-primary-50 hover:bg-primary-50 active:bg-primary-50'
            )}
            isActive={props.meta.pagination.page === max}
          >
            {max}
          </PaginationLink>
        </PaginationItem>
      );

    return items || [];
  };
  return (
    <PaginationShadcn className="lg:py-16 py-14 w-full">
      {/* Desktop */}
      <PaginationContent className="w-full flex-row justify-between lg:flex hidden">
        <PaginationItem>
          <PaginationPrevious
            className={cn('cursor-pointer', currentPage === 1 && 'invisible')}
            onClick={() => {
              if (currentPage > 1) {
                handleTabClick(currentPage - 1);
              }
            }}
          />
        </PaginationItem>
        <div className="flex">
          {generatePaginationLinks(
            props.meta.pagination.page,
            props.meta.pagination.pageCount
          )}
        </div>
        <PaginationItem>
          <PaginationNext
            className={cn(
              'cursor-pointer',
              currentPage === props.meta.pagination.pageCount && 'invisible',
              props.meta.pagination.pageCount === 0 && 'invisible'
            )}
            onClick={() => {
              if (currentPage < props.meta.pagination.pageCount) {
                handleTabClick(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>

      {/* Mobile */}
      <PaginationContent className="w-full flex flex-row justify-between lg:hidden ">
        <PaginationItem>
          <div
            className="flex h-10 w-10 p-2 lg:p-3 rounded-xl border items-center justify-center cursor-pointer"
            onClick={() => {
              if (currentPage > 1) {
                handleTabClick(currentPage - 1);
              }
            }}
          >
            <ChevronLeft className="h-5 w-5 text-black-500" />
          </div>
        </PaginationItem>
        <div className="flex items-center justify-center text-sm font-normal text-black-200 !leading-[130%]">
          Page {currentPage} of {props.meta.pagination.pageCount}
        </div>
        <PaginationItem>
          <div
            className="flex h-10 w-10 p-2 lg:p-3 rounded-xl border items-center justify-center cursor-pointer"
            onClick={() => {
              if (currentPage < props.meta.pagination.pageCount) {
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
