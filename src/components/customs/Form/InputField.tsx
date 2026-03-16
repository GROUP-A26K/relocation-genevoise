import { FC, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";
import { FormField } from "./FormField";
import { cn } from "@/libs/utils";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  isRequired?: boolean;
  error?: string;
  inputClassName?: string;
  icon?: ReactNode;
  labelClassName?: string;
}

export const InputField: FC<InputFieldProps> = ({
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
  ...props
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
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-black-50">
            {icon}
          </div>
        )}
        <Input
          className={cn(
            "text-sm h-10 !mt-0",
            "shadow-none placeholder:text-black-50 text-black-50 rounded-[1.5rem] border-gray-200",
            "hover:border-black-50 hover:text-back-100",
            "focus-visible:text-black-50 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-50",
            icon && "pl-10",
            error && "border-red-500 hover:border-red-500",
            inputClassName
          )}
          placeholder={placeholder}
          {...register(name)}
          {...props}
        />
      </div>
    </FormField>
  );
};
