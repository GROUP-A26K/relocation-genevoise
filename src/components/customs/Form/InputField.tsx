import { X } from "lucide-react";
import {
  UseFormRegister,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import { cn } from "@/libs/utils";
import { Input } from "@/components/ui/input";

import { FormField } from "./FormField";

import type { ReactNode } from "react";

interface InputFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder: string;
  isRequired?: boolean;
  error?: string;
  inputClassName?: string;
  icon?: ReactNode;
  labelClassName?: string;
  register: UseFormRegister<TFieldValues>;
  onClear?: () => void;
}

export const InputField = <TFieldValues extends FieldValues = FieldValues>({
  name,
  label,
  placeholder,
  isRequired,
  register,
  error,
  inputClassName = "",
  icon,
  labelClassName,
  className,
  onClear,
  ...props
}: InputFieldProps<TFieldValues>) => {
  return (
    <FormField
      isRequired={isRequired}
      label={label}
      message={error}
      className={className}
      labelClassName={labelClassName}
      htmlFor={name}
    >
      <div className="group relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black-50">
            {icon}
          </div>
        )}
        <Input
          id={name}
          className={cn(
            "text-sm h-10 !mt-0",
            "shadow-none placeholder:text-black-50 text-black-50 rounded-[1.5rem] border-gray-200",
            "hover:border-black-50 hover:text-back-100",
            "focus-visible:text-black-50 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-50",
            icon && "pl-10",
            onClear && "pr-8",
            error && "border-red-500 hover:border-red-500",
            inputClassName,
          )}
          placeholder={placeholder}
          {...register(name)}
          {...props}
        />
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-black-50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
            tabIndex={-1}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </FormField>
  );
};
