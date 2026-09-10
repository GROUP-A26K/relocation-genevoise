import React, { type FC } from 'react';

import { cn } from '@/libs/utils';
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type FormFieldProps = {
  label?: string;
  isRequired?: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
  labelClassName?: string;
  htmlFor?: string;
};

export const FormField: FC<FormFieldProps> = ({
  label,
  children,
  isRequired,
  message,
  className,
  labelClassName,
  htmlFor,
}) => {
  return (
    <FormItem className={cn('flex w-full flex-col gap-1.5', className)}>
      {label && (
        <FormLabel
          className={cn('flex gap-0.5 text-sm leading-[130%]!', labelClassName)}
          {...(htmlFor ? { htmlFor } : {})}
        >
          {label}
          {isRequired && <div className="text-red-500">*</div>}
        </FormLabel>
      )}
      <FormControl className="mt-0 rounded-full">{children}</FormControl>
      {message && <FormMessage className="mt-0!">{message}</FormMessage>}
    </FormItem>
  );
};
