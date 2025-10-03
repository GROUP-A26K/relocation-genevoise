import type { ComponentPropsWithoutRef } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import type { Country } from "react-phone-number-input";

import { PhoneInput } from "@/components/ui/phone-input";
import { cn } from "@/libs/utils";

import { FormField } from "./FormField";

type PhoneInputBaseProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  error?: string;
  className?: string;
  inputClassName?: string;
  countrySelectClassName?: string;
  defaultCountry?: Country;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
};

type PhoneInputFieldProps<TFieldValues extends FieldValues = FieldValues> =
  PhoneInputBaseProps<TFieldValues> &
    Omit<
      ComponentPropsWithoutRef<typeof PhoneInput>,
      | "name"
      | "value"
      | "defaultValue"
      | "onChange"
      | "onBlur"
      | "ref"
      | "placeholder"
      | "inputClassName"
      | "countrySelectClassName"
      | "defaultCountry"
    >;

export function PhoneInputField<
  TFieldValues extends FieldValues = FieldValues,
>({
  name,
  label,
  placeholder,
  isRequired,
  error,
  className,
  inputClassName,
  countrySelectClassName,
  defaultCountry = "CH",
  control,
  rules,
  ...phoneInputProps
}: PhoneInputFieldProps<TFieldValues>) {
  return (
    <FormField
      isRequired={isRequired}
      label={label}
      message={error}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <PhoneInput
            {...phoneInputProps}
            name={field.name}
            value={(field.value as string | undefined) ?? ""}
            onChange={(value) => field.onChange(value ?? "")}
            onBlur={field.onBlur}
            placeholder={placeholder}
            className="!mt-0"
            inputClassName={cn(
              "text-sm h-10 !mt-0",
              "shadow-none placeholder:text-black-50 text-black-50 border-gray-200",
              "hover:border-black-50 hover:text-back-100",
              "focus-visible:text-black-50 focus-visible:border-yellow-500 focus-visible:ring-2 focus-visible:ring-yellow-50",
              error && "border-red-500 hover:border-red-500",
              inputClassName
            )}
            countrySelectClassName={cn(
              error && "border-red-500 hover:border-red-500",
              countrySelectClassName
            )}
            defaultCountry={defaultCountry}
          />
        )}
      />
    </FormField>
  );
}
