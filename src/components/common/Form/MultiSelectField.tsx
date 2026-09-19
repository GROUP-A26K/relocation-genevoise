'use client';
import { useBoolean } from 'usehooks-ts';
import { Controller, useFormContext } from 'react-hook-form';
import { Check, ChevronDown, ChevronUp, X } from 'lucide-react';

import { cn } from '@/libs/utils';
import { cn as typographyCn } from '@/components/common/Text/utils';
import BodyText, { bodyTextVariants } from '@/components/common/Text/BodyText';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import type { ReactNode } from 'react';

interface IMultiSelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  icon?: ReactNode;
}

export const MultiSelectField: React.FC<IMultiSelectFieldProps> = ({
  name,
  label,
  placeholder,
  options,
  className,
  labelClassName,
  triggerClassName,
  icon,
}) => {
  const { control, setValue } = useFormContext();
  const { value: open, setValue: setOpen } = useBoolean(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const selected = (field.value as string[] | undefined) ?? [];

        const handleToggle = (value: string) => {
          const next = selected.includes(value)
            ? selected.filter((v) => v !== value)
            : [...selected, value];
          setValue(name, next, { shouldDirty: true });
        };

        const handleClear = (e: React.MouseEvent) => {
          e.stopPropagation();
          e.preventDefault();
          setValue(name, [], { shouldDirty: true });
        };

        const displayText = (() => {
          if (selected.length === 0) return placeholder;
          const firstLabel =
            options.find((o) => o.value === selected[0])?.label ?? selected[0];
          if (selected.length === 1) return firstLabel;
          return `${firstLabel} +${selected.length - 1}`;
        })();

        const hasValue = selected.length > 0;

        return (
          <div className={cn('flex w-full flex-col gap-1.5', className)}>
            {label && (
              <BodyText
                asChild
                className={typographyCn(
                  'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
                  typographyCn('text-sm leading-[130%]', labelClassName)
                )}
              >
                <span>{label}</span>
              </BodyText>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    bodyTextVariants(),
                    'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
                    cn(
                      'group relative flex h-10 w-full items-center justify-between rounded-full text-sm',
                      'border bg-white px-3',
                      'border-grey-100',
                      'hover:border-black-50',
                      'focus:border-secondary-500 focus:ring-2 focus:ring-secondary-50 focus:outline-hidden',
                      'data-[state=open]:border-secondary-500 data-[state=open]:ring-2 data-[state=open]:ring-secondary-50',
                      icon && 'pl-10',
                      triggerClassName
                    )
                  )}
                >
                  {icon && (
                    <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-black-50">
                      {icon}
                    </span>
                  )}
                  <BodyText
                    asChild
                    className={typographyCn(
                      'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-nowrap text-inherit',
                      typographyCn(
                        'truncate text-sm font-medium',
                        hasValue ? 'text-black-500' : 'text-black-50'
                      )
                    )}
                  >
                    <span>{displayText}</span>
                  </BodyText>

                  <div className="ml-2 flex shrink-0 items-center gap-1">
                    {hasValue && (
                      <X
                        className="h-3.5 w-3.5 cursor-pointer text-black-50 opacity-0 group-hover:opacity-100"
                        onClick={handleClear}
                      />
                    )}
                    {open ? (
                      <ChevronUp className="h-3.5 w-3.5 text-black-50" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-black-50" />
                    )}
                  </div>
                </button>
              </PopoverTrigger>

              <PopoverContent
                className="max-h-[320px] overflow-auto rounded-2xl border-grey-100 p-1"
                align="start"
                style={{ width: 'var(--radix-popover-trigger-width)' }}
              >
                <div className="flex flex-col gap-0.5">
                  {options.map((option) => {
                    const isSelected = selected.includes(option.value);

                    return (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          bodyTextVariants(),
                          'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
                          cn(
                            'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-black-500',
                            'hover:bg-grey-50',
                            isSelected && 'bg-grey-50'
                          )
                        )}
                        onClick={() => handleToggle(option.value)}
                      >
                        <BodyText
                          asChild
                          className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit"
                        >
                          <span>{option.label}</span>
                        </BodyText>
                        {isSelected && (
                          <Check className="h-5 w-5 shrink-0 text-secondary-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      }}
    />
  );
};
