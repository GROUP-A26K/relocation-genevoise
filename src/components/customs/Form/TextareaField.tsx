'use client';

import {
  useFormContext,
  useWatch,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { cn } from '@/libs/utils';
import { Textarea } from '@/components/ui/textarea';

import { FormField } from './FormField';

type TextareaFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  name: FieldPath<TFieldValues>;
  label: string;
  placeholder: string;
  isRequired?: boolean;
  error?: string;
  maxLength?: number;
  className?: string;
};

export const TextareaField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  isRequired,
  error,
  maxLength,
  className,
}: TextareaFieldProps<TFieldValues>) => {
  const { register, control } = useFormContext();
  const value: unknown = useWatch({ control, name });
  const length = typeof value === 'string' ? value.length : 0;

  return (
    <FormField
      isRequired={isRequired}
      label={label}
      message={error}
      htmlFor={name}
    >
      <div className="relative">
        <Textarea
          id={name}
          className={cn(
            'mt-0! rounded-xl text-sm leading-[130%]!',
            'border-gray-200 text-black-50 shadow-none placeholder:text-black-50',
            'hover:text-back-100 hover:border-black-50',
            'focus-visible:border-secondary-500 focus-visible:text-black-50 focus-visible:ring-2 focus-visible:ring-secondary-50',
            error && 'border-red-500 hover:border-red-500',
            !!maxLength && 'pb-7',
            className
          )}
          placeholder={placeholder}
          rows={5}
          maxLength={maxLength}
          {...register(name)}
        />
        {!!maxLength && (
          <span className="pointer-events-none absolute right-3 bottom-2.5 text-sm leading-[130%]! text-black-50">
            {length}/{maxLength}
          </span>
        )}
      </div>
    </FormField>
  );
};
