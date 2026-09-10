'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { RevealItem } from '@/components/customs/Reveal';
import {
  PROPERTY_SORT_OPTIONS,
  usePropertyFilters,
} from '@/hooks/usePropertyFilters';

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
  const t = useTranslations('Properties');
  const { queryParams, handleSortChange, handleAvailableOnlyChange } =
    usePropertyFilters();
  const [sortOpen, setSortOpen] = useState(false);

  const startItem = total > 0 ? (page - 1) * pageSize + 1 : 0;
  const endItem = Math.min(page * pageSize, total);
  const currentSortLabel =
    PROPERTY_SORT_OPTIONS.find((option) => option.value === queryParams.sort)
      ?.labelKey ?? 'sort.newest';

  const handleSortSelect = (value: string) => {
    handleSortChange(value);
    setSortOpen(false);
  };

  return (
    <RevealItem className="mb-8 flex gap-4 max-md:flex-col-reverse md:items-center md:justify-between">
      <div className="text-p leading-[130%]! font-normal text-black-500">
        {t('results.showing')}{' '}
        <span className="font-bold">
          {startItem}-{endItem}
        </span>{' '}
        {t('results.ofTotal')} <span className="font-bold">{total}</span>{' '}
        {t('results.results')}
      </div>

      <div className="flex flex-wrap items-center gap-3 max-md:justify-between">
        <button
          role="switch"
          aria-checked={queryParams.availableOnly}
          onClick={() => handleAvailableOnlyChange(!queryParams.availableOnly)}
          className="group flex cursor-pointer items-center gap-2"
        >
          <div
            className={`relative h-6 w-10 rounded-full transition-colors duration-200 ${
              queryParams.availableOnly ? 'bg-blue-500' : 'bg-grey-200'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
                queryParams.availableOnly ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </div>
          <span className="text-p leading-[130%]! font-normal whitespace-nowrap text-black-500">
            {t('results.showAvailableOnly')}
          </span>
        </button>

        <div className="relative flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setSortOpen((isOpen) => !isOpen)}
              className="flex h-10 items-center justify-center gap-2 rounded-full bg-grey-100 px-4 py-3 text-p leading-[130%]! font-semibold whitespace-nowrap text-black-500 transition-colors hover:bg-grey-200"
            >
              {t(currentSortLabel)}
              <ChevronDown className="h-4 w-4" />
            </button>
            {sortOpen && (
              <div className="absolute top-12 right-0 z-10 min-w-[180px] rounded-xl border border-grey-100 bg-white py-1 shadow-lg">
                {PROPERTY_SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full px-4 py-2 text-left text-p leading-[130%]! transition-colors hover:bg-grey-50 ${
                      queryParams.sort === option.value
                        ? 'font-semibold text-black-500'
                        : 'font-normal text-black-300'
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
    </RevealItem>
  );
}
