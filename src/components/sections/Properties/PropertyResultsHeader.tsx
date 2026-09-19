'use client';
import { useTranslations } from 'next-intl';

import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import {
  PROPERTY_SORT_OPTIONS,
  usePropertyFilters,
} from '@/hooks/usePropertyFilters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const startItem = total > 0 ? (page - 1) * pageSize + 1 : 0;
  const endItem = Math.min(page * pageSize, total);
  const currentSort =
    PROPERTY_SORT_OPTIONS.find((option) => option.value === queryParams.sort)
      ?.value ?? PROPERTY_SORT_OPTIONS[0].value;

  return (
    <RevealItem className="flex gap-4 max-md:flex-col-reverse md:items-center md:justify-between">
      <BodyText variant="md" asChild className="text-black-500">
        <div>
          {t('results.showing')}{' '}
          <span className="font-bold">
            {startItem}-{endItem}
          </span>{' '}
          {t('results.ofTotal')} <span className="font-bold">{total}</span>{' '}
          {t('results.results')}
        </div>
      </BodyText>

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
          <BodyText
            variant="md"
            asChild
            className="whitespace-nowrap text-black-500"
          >
            <span>{t('results.showAvailableOnly')}</span>
          </BodyText>
        </button>

        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="h-10 w-auto gap-2 rounded-full border-0 bg-grey-100 px-4 py-3 text-sm leading-[130%] font-semibold text-black-500 shadow-none transition-colors hover:bg-grey-200 focus:ring-0 [&>svg]:opacity-100">
            <SelectValue />
          </SelectTrigger>
          <SelectContent
            align="end"
            sideOffset={8}
            className="min-w-[180px] rounded-xl border-grey-100 bg-white shadow-lg"
          >
            {PROPERTY_SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer rounded-md px-4 py-2 text-sm leading-[130%] font-normal text-black-300 focus:bg-grey-50 focus:text-black-500 data-[state=checked]:font-semibold data-[state=checked]:text-black-500 [&>span:first-child]:hidden"
              >
                {t(option.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </RevealItem>
  );
}
