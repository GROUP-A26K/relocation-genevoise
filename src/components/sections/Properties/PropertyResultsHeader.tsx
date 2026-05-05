"use client";

import { useState } from "react";
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

export default function PropertyResultsHeader({
  total,
  page,
  pageSize,
}: IPropertyResultsHeaderProps) {
  const t = useTranslations("Properties");
  const { queryParams, handleSortChange, handleAvailableOnlyChange } = usePropertyFilters();
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

      <div className="flex gap-3 items-center flex-wrap max-md:justify-between">
        <button
          role="switch"
          aria-checked={queryParams.availableOnly}
          onClick={() => handleAvailableOnlyChange(!queryParams.availableOnly)}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div
            className={`relative w-10 h-6 rounded-full transition-colors duration-200 ${
              queryParams.availableOnly ? "bg-blue-500" : "bg-grey-200"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                queryParams.availableOnly ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
          <span className="text-p font-normal text-black-500 !leading-[130%] whitespace-nowrap">
            {t("results.showAvailableOnly")}
          </span>
        </button>

        <div className="flex gap-3 items-center relative">
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
    </div>
  );
}
