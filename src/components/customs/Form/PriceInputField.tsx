import {
  Controller,
  type RegisterOptions,
  useFormContext,
} from 'react-hook-form';

import { cn } from '@/libs/utils';
import { Input } from '@/components/ui/input';

import { FormField } from './FormField';

import type { FC, ReactNode } from 'react';

interface PriceInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  suffix?: ReactNode;
  rules?: RegisterOptions;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
}

export const PriceInputField: FC<PriceInputFieldProps> = ({
  name,
  label,
  placeholder,
  suffix,
  rules,
  className,
  labelClassName,
  inputClassName,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormField
          label={label}
          message={fieldState.error?.message}
          className={className}
          labelClassName={labelClassName}
        >
          <div className="relative flex items-center">
            <Input
              {...field}
              type="text"
              inputMode="numeric"
              placeholder={placeholder}
              className={cn(
                'mt-0! h-10 text-sm',
                'rounded-3xl border-gray-200 text-black-500 shadow-none placeholder:text-black-50',
                'hover:border-black-50',
                'focus-visible:border-secondary-500 focus-visible:text-black-500 focus-visible:ring-2 focus-visible:ring-secondary-50',
                suffix && 'pr-10',
                fieldState.error && 'border-red-500 hover:border-red-500',
                inputClassName
              )}
            />
            {suffix && (
              <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-black-500 select-none">
                {suffix}
              </span>
            )}
          </div>
        </FormField>
      )}
    />
  );
};
