import { Controller, type FieldPath, type FieldValues } from "react-hook-form";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/libs/utils";
import { Link } from "@/libs/i18nNavigation";

type CheckboxFieldProps<TFieldValues extends FieldValues = FieldValues> = {
  label: string;
  name: FieldPath<TFieldValues>;
  error?: string;
  policy?: string;
  className?: string;
};

export const CheckboxField = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  error,
  policy,
  className,
}: CheckboxFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <div className={cn("flex flex-row items-start gap-1.5", className)}>
        <div className="h-[21px]">
          <FormControl className="rounded-full">
            <Controller
              name={name}
              render={({ field }) => (
                <Checkbox
                  id={name}
                  className="border border-black-50"
                  {...field}
                  onCheckedChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </FormControl>
        </div>
        <div className="text-sm leading-[150%]">
          <FormLabel
            htmlFor={name}
            className="inline font-normal cursor-pointer"
          >
            {label}
          </FormLabel>{" "}
          <Link href="/legal-notices" className="font-semibold text-black-500">
            {policy}
          </Link>
        </div>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
