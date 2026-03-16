import { FC, ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormControl } from "@/components/ui/form";
import { Controller, UseFormRegister } from "react-hook-form";
import { FormField } from "./FormField";
import { cn } from "@/libs/utils";

type SelectFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  error?: string;
  isRequired?: boolean;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  icon?: ReactNode;
};

export const SelectField: FC<SelectFieldProps> = ({
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
}) => {
  return (
    <FormField
      isRequired={isRequired}
      label={label}
      message={error}
      className={className}
      labelClassName={labelClassName}
    >
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black-50 z-10">
            {icon}
          </div>
        )}
        <Controller
          name={name}
          render={({ field }) => (
            <Select
              {...field}
              onValueChange={field.onChange}
              value={field.value || undefined}
            >
              <FormControl>
                <SelectTrigger
                  className={cn(
                    "rounded-full text-sm h-10 !mt-0",
                    "shadow-none data-[placeholder]:text-black-50 placeholder:font-medium rounded-[1.5rem] border-gray-200",
                    "hover:border-black-50 hover:text-back-100",
                    "focus:!text-black-50 focus:!border-secondary-500 focus:!ring-2 focus:!ring-secondary-50",
                    "[&[data-state=open]]:!text-black-50 [&[data-state=open]]:!border-secondary-500 [&[data-state=open]]:!ring-2 [&[data-state=open]]:!ring-secondary-50",
                    icon && "pl-10",
                    error && "border-red-500 hover:border-red-500",
                    triggerClassName
                  )}
                >
                  <SelectValue placeholder={placeholder} />
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
          )}
        />
      </div>
    </FormField>
  );
};
