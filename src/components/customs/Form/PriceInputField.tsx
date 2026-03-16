import { FC, ReactNode } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { FormField } from "./FormField";
import { cn } from "@/libs/utils";

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
                "text-sm h-10 !mt-0",
                "shadow-none placeholder:text-black-50 text-black-500 rounded-[1.5rem] border-gray-200",
                "hover:border-black-50",
                "focus-visible:text-black-500 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-50",
                suffix && "pr-10",
                fieldState.error && "border-red-500 hover:border-red-500",
                inputClassName
              )}
            />
            {suffix && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-black-500 pointer-events-none select-none">
                {suffix}
              </span>
            )}
          </div>
        </FormField>
      )}
    />
  );
};
