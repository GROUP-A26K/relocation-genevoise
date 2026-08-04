import {
  Pagination as PaginationShadcn,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination-custom";
import { cn } from "@/libs/utils";
import { Meta } from "@/models/Meta";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC } from "react";

interface Props {
  meta: Meta;
  className?: string;
  onClick: (value: number) => void;
}

const pageItemClassName =
  "h-10 w-10 p-0 rounded-full flex items-center justify-center font-semibold";

export const Pagination: FC<Props> = ({ meta, className, onClick }) => {
  const currentPage = meta.pagination.page;

  const handleTabClick = (value: number) => {
    onClick(value);
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
            pageItemClassName,
            meta.pagination.page === 1 &&
              "border-0 !text-black-500 bg-secondary-500 hover:bg-secondary-500 active:bg-secondary-500",
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

    for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) {
      items.push(
        <PaginationItem
          key={i}
          onClick={() => handleTabClick(i)}
          className="cursor-pointer"
        >
          <PaginationLink
            className={cn(
              pageItemClassName,
              meta.pagination.page === i &&
                "border-0 !text-black-500 bg-secondary-500 hover:bg-secondary-500 active:bg-secondary-500",
            )}
            isActive={meta.pagination.page === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
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
              pageItemClassName,
              meta.pagination.page === max &&
                "border-0 !text-black-500 bg-secondary-500 hover:bg-secondary-500 active:bg-secondary-500",
            )}
            isActive={meta.pagination.page === max}
          >
            {max}
          </PaginationLink>
        </PaginationItem>,
      );

    return items || [];
  };
  return (
    <PaginationShadcn className={cn("py-12 w-full lg:py-16", className)}>
      {/* Desktop */}
      <PaginationContent className="w-full flex-row justify-between lg:flex hidden lg:pt-8 border-t border-t-grey-100">
        <PaginationItem>
          <PaginationPrevious
            className={cn("cursor-pointer", currentPage === 1 && "invisible")}
            onClick={() => {
              if (currentPage > 1) {
                handleTabClick(currentPage - 1);
              }
            }}
          />
        </PaginationItem>
        <div className="flex">
          {generatePaginationLinks(
            meta.pagination.page,
            meta.pagination.pageCount,
          )}
        </div>
        <PaginationItem>
          <PaginationNext
            className={cn(
              "cursor-pointer",
              currentPage === meta.pagination.pageCount && "invisible",
              meta.pagination.pageCount === 0 && "invisible",
            )}
            onClick={() => {
              if (currentPage < meta.pagination.pageCount) {
                handleTabClick(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>

      {/* Mobile */}
      <PaginationContent className="w-full flex flex-row justify-between lg:hidden pt-8 border-t border-t-grey-100">
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
          Page {currentPage} of {meta.pagination.pageCount}
        </div>
        <PaginationItem>
          <div
            className="flex h-10 w-10 p-2 lg:p-3 rounded-xl border items-center justify-center cursor-pointer"
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
