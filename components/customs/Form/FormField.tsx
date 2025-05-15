import React, { FC } from 'react';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/libs/utils';

type FormFieldProps = {
  label?: string;
  isRequired?: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
};

export const FormField: FC<FormFieldProps> = ({
  label,
  children,
  isRequired,
  message,
  className,
}) => {
  return (
    <FormItem className={cn('w-full flex flex-col gap-1.5', className)}>
      {label && (
        <FormLabel className="text-sm !leading-[130%] flex gap-0.5">
          {label}
          {isRequired && <div className="text-red-500">*</div>}
        </FormLabel>
      )}
      <FormControl className="mt-0 rounded-full">{children}</FormControl>
      {message && <FormMessage className="!mt-0">{message}</FormMessage>}
    </FormItem>
  );
};
