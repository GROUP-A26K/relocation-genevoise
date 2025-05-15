import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { FormField } from "./FormField";
import { cn } from "@/libs/utils";

type InputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
  isRequired?: boolean;
  error?: string;
};

export const TextareaField: FC<InputFieldProps> = ({
  name,
  label,
  placeholder,
  isRequired,
  register,
  error,
}) => {
  return (
    <FormField isRequired={isRequired} label={label} message={error}>
      <Textarea
        className={cn(
          "text-sm !mt-0 rounded-xl !leading-[130%]",
          "shadow-none placeholder:text-black-50 text-black-50 border-gray-200",
          "hover:border-black-50 hover:text-back-100",
          "focus-visible:text-black-50 focus-visible:border-secondary-500 focus-visible:ring-2 focus-visible:ring-secondary-50",
          error && "border-red-500 hover:border-red-500"
        )}
        placeholder={placeholder}
        rows={5}
        {...register(name)}
      />
    </FormField>
  );
};
