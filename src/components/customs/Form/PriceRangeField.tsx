'use client';

import { useBoolean } from 'usehooks-ts';
import { useTranslations } from 'next-intl';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import {
  Check,
  ChevronDown,
  ChevronUp,
  CircleDollarSign,
  X,
} from 'lucide-react';

import { cn } from '@/libs/utils';
import { useExchangeRates } from '@/context/ExchangeRatesContext';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CURRENCIES,
  PRICE_RANGE_OPTIONS,
  PROPERTY_DEFAULT_CURRENCY,
  getPriceRangeByValue,
} from '@/constants/property';

import type { FC, ReactNode } from 'react';

interface PriceRangeFieldProps {
  label?: string;
  priceRangeName?: string;
  currencyName?: string;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  icon?: ReactNode;
  hideCurrency?: boolean;
}

export const PriceRangeField: FC<PriceRangeFieldProps> = ({
  label,
  priceRangeName = 'priceRange',
  currencyName = 'currency',
  className,
  labelClassName,
  triggerClassName,
  hideCurrency = false,
}) => {
  const t = useTranslations('Properties');
  const { convertFromCHF } = useExchangeRates();
  const { control, setValue } = useFormContext();
  const priceRange = useWatch({ name: priceRangeName }) as string | undefined;
  const currency = useWatch({ name: currencyName }) as string | undefined;
  const { value: open, setValue: setOpen } = useBoolean(false);
  const { value: currencyOpen, setValue: setCurrencyOpen } = useBoolean(false);

  const formatAmount = (chfAmount: number, currencyValue: string): string =>
    convertFromCHF(chfAmount, currencyValue).toLocaleString('en-US');

  const currencyValue: string = currency || PROPERTY_DEFAULT_CURRENCY;
  const selectedRange = getPriceRangeByValue(priceRange ?? '');
  const hasValue = !!priceRange;

  const getRangeLabel = (option: (typeof PRICE_RANGE_OPTIONS)[number]) => {
    if (!option.min && !option.max) return t('filters.anyPrice');
    if (option.min === 0)
      return `${t('filters.under')} ${formatAmount(option.max, currencyValue)}`;
    if (option.max === 0) return `${formatAmount(option.min, currencyValue)}+`;
    return `${formatAmount(option.min, currencyValue)} – ${formatAmount(option.max, currencyValue)}`;
  };

  const displayLabel = getRangeLabel(selectedRange);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setValue(priceRangeName, '', { shouldDirty: true });
  };

  const handleSelectRange = (value: string) => {
    setValue(priceRangeName, value, { shouldDirty: true });
    setOpen(false);
  };

  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <span className={cn('text-sm leading-[130%]!', labelClassName)}>
          {label}
        </span>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              'group relative flex h-10 w-full items-center rounded-full text-sm',
              'border bg-white px-3',
              'border-grey-100',
              'hover:border-black-50',
              'focus:border-secondary-500 focus:ring-2 focus:ring-secondary-50 focus:outline-hidden',
              'data-[state=open]:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-50',
              currencyOpen && 'border-secondary-500! ring-2 ring-secondary-50',
              triggerClassName
            )}
          >
            {/* Static icon when currency is hidden */}
            {hideCurrency && (
              <span className="pointer-events-none mr-2 flex shrink-0 items-center text-black-50">
                <CircleDollarSign className="h-[18px] w-[18px]" />
              </span>
            )}

            {/* Currency selector */}
            {!hideCurrency && (
              <>
                <div
                  className="flex shrink-0 items-center"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <Controller
                    control={control}
                    name={currencyName}
                    render={({ field }) => (
                      <Select
                        onOpenChange={setCurrencyOpen}
                        onValueChange={field.onChange}
                        value={
                          (field.value as string | undefined) ||
                          PROPERTY_DEFAULT_CURRENCY
                        }
                      >
                        <SelectTrigger className="h-auto w-auto gap-1 border-0 p-0 text-sm font-medium text-black-500 shadow-none focus:ring-0 [&>svg]:hidden">
                          <SelectValue />
                          <span className="shrink-0">
                            <ChevronDown
                              className={cn(
                                'h-3.5 w-3.5 text-black-50 transition-transform duration-200',
                                currencyOpen && 'rotate-180 text-secondary-500'
                              )}
                            />
                          </span>
                        </SelectTrigger>
                        <SelectContent
                          align="start"
                          sideOffset={8}
                          className="-ml-3"
                        >
                          {CURRENCIES.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Divider */}
                <div className="mx-2 h-4 w-px shrink-0 bg-[#d9d9d9]" />
              </>
            )}

            {/* Price range display */}
            <span
              className={cn(
                'flex-1 truncate text-left text-sm font-medium',
                hasValue ? 'text-black-500' : 'text-black-50'
              )}
            >
              {displayLabel}
            </span>

            {/* Clear button (visible on hover) */}
            {hasValue && (
              <X
                className="ml-2 h-3.5 w-3.5 shrink-0 cursor-pointer text-black-50 opacity-0 group-hover:opacity-100"
                onClick={handleClear}
              />
            )}

            {/* Chevron */}
            {open ? (
              <ChevronUp className="ml-1 h-3.5 w-3.5 shrink-0 text-black-50" />
            ) : (
              <ChevronDown className="ml-1 h-3.5 w-3.5 shrink-0 text-black-50" />
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="flex max-h-[320px] flex-col gap-0.5 overflow-auto rounded-2xl border-grey-100 p-1"
          align="start"
          style={{ width: 'var(--radix-popover-trigger-width)' }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {PRICE_RANGE_OPTIONS.map((option) => {
            const isSelected = priceRange === option.value;
            const optionLabel = getRangeLabel(option);

            return (
              <button
                key={option.value || '__any__'}
                type="button"
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-black-500',
                  'hover:bg-grey-50',
                  isSelected && 'bg-grey-50'
                )}
                onClick={() => handleSelectRange(option.value)}
              >
                <span>{optionLabel}</span>
                {isSelected && (
                  <Check className="h-5 w-5 shrink-0 text-secondary-500" />
                )}
              </button>
            );
          })}
        </PopoverContent>
      </Popover>
    </div>
  );
};
