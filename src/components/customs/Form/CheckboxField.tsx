import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, FieldPath, FieldValues } from "react-hook-form";

type CheckboxFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string;
  name: FieldPath<TFieldValues>;
  error?: string;
};

export const CheckboxField = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  error,
}: CheckboxFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <div className="flex flex-row items-start gap-1.5">
        <FormControl className="rounded-full">
          <Controller
            name={name}
            render={({ field }) => (
              <Checkbox
                id={name}
                className="rounded-full border border-blue-500 data-[state=checked]:bg-blue-400 data-[state=unchecked]:bg-white"
                {...field}
                onCheckedChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </FormControl>
        <FormLabel
          className="text-sm font-normal text-black-200 !leading-[130%] cursor-pointer"
          htmlFor={name}
        >
          {label}
        </FormLabel>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
