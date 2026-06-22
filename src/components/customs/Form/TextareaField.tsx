"use client";

import {
  useFormContext,
  useWatch,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/libs/utils";
import { Textarea } from "@/components/ui/textarea";

import { FormField } from "./FormField";

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
  const value = useWatch({ control, name });
  const length = typeof value === "string" ? value.length : 0;

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
            "text-sm !mt-0 rounded-xl !leading-[130%]",
            "shadow-none placeholder:text-black-50 text-black-50 border-gray-200",
            "hover:border-black-50 hover:text-back-100",
            "focus-visible:text-black-50 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-50",
            error && "border-red-500 hover:border-red-500",
            !!maxLength && "pb-7",
            className,
          )}
          placeholder={placeholder}
          rows={5}
          maxLength={maxLength}
          {...register(name)}
        />
        {!!maxLength && (
          <span className="pointer-events-none absolute bottom-2.5 right-3 text-sm !leading-[130%] text-black-50">
            {length}/{maxLength}
          </span>
        )}
      </div>
    </FormField>
  );
};
