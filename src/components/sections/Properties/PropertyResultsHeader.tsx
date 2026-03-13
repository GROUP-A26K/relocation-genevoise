"use client";

import { FC, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  PROPERTY_SORT_OPTIONS,
  usePropertyFilters,
} from "@/hooks/usePropertyFilters";

interface IPropertyResultsHeaderProps {
  total: number;
  page: number;
  pageSize: number;
}

export const PropertyResultsHeader: FC<IPropertyResultsHeaderProps> = ({
  total,
  page,
  pageSize,
}) => {
  const t = useTranslations("Properties");
  const { queryParams, handleSortChange } = usePropertyFilters();
  const [sortOpen, setSortOpen] = useState(false);

  const startItem = total > 0 ? (page - 1) * pageSize + 1 : 0;
  const endItem = Math.min(page * pageSize, total);
  const currentSortLabel =
    PROPERTY_SORT_OPTIONS.find((option) => option.value === queryParams.sort)
      ?.labelKey ?? "sort.newest";

  const handleSortSelect = (value: string) => {
    handleSortChange(value);
    setSortOpen(false);
  };

  return (
    <div className="flex mb-8 max-md:flex-col-reverse md:items-center md:justify-between gap-4">
      <div className="text-p font-normal text-black-500 !leading-[130%]">
        {t("results.showing")}{" "}
        <span className="font-bold">
          {startItem}-{endItem}
        </span>{" "}
        {t("results.ofTotal")} <span className="font-bold">{total}</span>{" "}
        {t("results.results")}
      </div>

      <div className="flex gap-3 items-center relative max-md:flex-1 max-md:w-full max-md:justify-between">
        <span className="text-p font-normal text-black-500 !leading-[130%]">
          {t("results.sortBy")}
        </span>
        <div className="relative">
          <button
            onClick={() => setSortOpen((isOpen) => !isOpen)}
            className="flex items-center justify-center gap-2 h-10 px-4 py-3 bg-grey-100 hover:bg-grey-200 rounded-full text-p font-semibold text-black-500 !leading-[130%] whitespace-nowrap transition-colors"
          >
            {t(currentSortLabel)}
            <ChevronDown className="w-4 h-4" />
          </button>
          {sortOpen && (
            <div className="absolute top-12 right-0 bg-white rounded-xl shadow-lg border border-grey-100 py-1 z-10 min-w-[180px]">
              {PROPERTY_SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-p !leading-[130%] hover:bg-grey-50 transition-colors ${
                    queryParams.sort === option.value
                      ? "font-semibold text-black-500"
                      : "font-normal text-black-300"
                  }`}
                >
                  {t(option.labelKey)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
