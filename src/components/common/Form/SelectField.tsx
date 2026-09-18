import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/libs/utils';
import { FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { FormField } from './FormField';

import type { ReactNode } from 'react';

interface ISelectFieldProps<TFieldValues extends FieldValues = FieldValues> {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  error?: string;
  isRequired?: boolean;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  icon?: ReactNode;
  control: Control<TFieldValues>;
}

export const SelectField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  options,
  placeholder,
  isRequired,
  error,
  className,
  labelClassName,
  triggerClassName,
  icon,
  control,
}: ISelectFieldProps<TFieldValues>) => {
  return (
    <FormField
      isRequired={isRequired}
      label={label}
      message={error}
      className={className}
      labelClassName={labelClassName}
      htmlFor={name}
    >
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-black-50">
            {icon}
          </div>
        )}
        <Controller
          control={control}
          name={name}
          render={({ field }) => {
            const selectedOption = options.find(
              (option) => option.value === field.value
            );

            return (
              <Select
                name={field.name}
                onValueChange={(value) => {
                  // Radix's hidden select can emit an empty value while a
                  // restored draft mounts, before its options are registered.
                  if (value !== '') field.onChange(value);
                }}
                value={field.value ?? ''}
              >
                <FormControl>
                  <SelectTrigger
                    id={name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    className={cn(
                      'mt-0 h-10 rounded-full text-sm',
                      'rounded-3xl border-gray-200 shadow-none placeholder:font-medium data-placeholder:text-black-50',
                      'hover:text-back-100 hover:border-black-50',
                      'focus:border-secondary-500 focus:text-black-50 focus:ring-2 focus:ring-secondary-50',
                      'data-[state=open]:border-secondary-500 data-[state=open]:text-black-50 data-[state=open]:ring-2 data-[state=open]:ring-secondary-50',
                      icon && 'pl-10',
                      error && 'border-red-500 hover:border-red-500',
                      triggerClassName
                    )}
                  >
                    <SelectValue placeholder={placeholder}>
                      {selectedOption?.label}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            );
          }}
        />
      </div>
    </FormField>
  );
};
