import { Controller, type FieldPath, type FieldValues } from 'react-hook-form';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { Checkbox } from '@/components/ui/checkbox';
import { bodyTextVariants } from '@/components/common/Text/BodyText';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ICheckboxFieldProps<TFieldValues extends FieldValues = FieldValues> {
  label: string;
  name: FieldPath<TFieldValues>;
  error?: string;
  policy?: string;
  className?: string;
}

export const CheckboxField = <TFieldValues extends FieldValues = FieldValues>({
  label,
  name,
  error,
  policy,
  className,
}: ICheckboxFieldProps<TFieldValues>) => {
  return (
    <FormItem>
      <div className={cn('flex flex-row items-start gap-1.5', className)}>
        <div className="h-[21px]">
          <FormControl className="rounded-full">
            <Controller
              name={name}
              render={({ field }) => (
                <Checkbox
                  id={name}
                  className="border border-black-50"
                  name={field.name}
                  ref={field.ref}
                  checked={Boolean(field.value)}
                  onBlur={field.onBlur}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </FormControl>
        </div>
        <div
          className={cn(
            bodyTextVariants(),
            'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
            'text-sm leading-[150%]'
          )}
        >
          <FormLabel
            htmlFor={name}
            className="inline cursor-pointer font-normal"
          >
            {label}
          </FormLabel>{' '}
          <Link href="/legal-notice" className="font-semibold text-black-500">
            {policy}
          </Link>
        </div>
      </div>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};
