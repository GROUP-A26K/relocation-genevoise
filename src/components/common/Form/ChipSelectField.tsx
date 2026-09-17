'use client';
import { Controller, useFormContext } from 'react-hook-form';

import { cn } from '@/libs/utils';
import { cn as typographyCn } from '@/components/common/Text/utils';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import BodyText, { bodyTextVariants } from '@/components/common/Text/BodyText';

import type { LucideIcon } from 'lucide-react';

type TChipOption = {
  value: string;
  label: string;
  Icon?: LucideIcon;
};

interface IChipSelectFieldProps {
  name: string;
  label?: string;
  isRequired?: boolean;
  error?: string;
  options: TChipOption[];
  className?: string;
  labelClassName?: string;
}

export const ChipSelectField: React.FC<IChipSelectFieldProps> = ({
  name,
  label,
  isRequired,
  error,
  options,
  className,
  labelClassName,
}) => {
  const { control, setValue } = useFormContext();

  return (
    <FormItem className={cn('flex w-full flex-col gap-2.5', className)}>
      {label && (
        <FormLabel
          className={cn('flex gap-0.5 text-sm leading-[130%]', labelClassName)}
        >
          {label}
          {isRequired && (
            <BodyText
              asChild
              className={typographyCn(
                'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
                'text-red-500'
              )}
            >
              <span>*</span>
            </BodyText>
          )}
        </FormLabel>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <div className="flex flex-wrap gap-2">
            {options.map(({ value, label: optionLabel, Icon }) => {
              const isSelected = field.value === value;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setValue(name, isSelected ? '' : value, {
                      shouldDirty: true,
                      shouldValidate: true,
                    })
                  }
                  className={cn(
                    bodyTextVariants(),
                    'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
                    cn(
                      'flex items-center gap-2 rounded-full border bg-white px-3 py-2 text-sm leading-[130%] font-normal text-black-300 transition-colors',
                      isSelected
                        ? 'border-secondary-500 bg-secondary-25'
                        : 'border-grey-100 hover:border-secondary-400'
                    )
                  )}
                >
                  {Icon && <Icon className="size-4 shrink-0 text-black-300" />}
                  {optionLabel}
                </button>
              );
            })}
          </div>
        )}
      />

      {error && <FormMessage className="mt-0">{error}</FormMessage>}
    </FormItem>
  );
};
