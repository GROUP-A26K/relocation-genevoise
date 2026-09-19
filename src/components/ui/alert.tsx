import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';
import HeadingText from '@/components/common/Text/HeadingText';
import { cn as typographyCn } from '@/components/common/Text/utils';
import { bodyTextVariants } from '@/components/common/Text/BodyText';

const alertVariants = cva(
  cn(
    bodyTextVariants(),
    'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
    'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7'
  ),
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground',
        destructive:
          'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}
function AlertTitle({ className, ...props }: React.ComponentProps<'h5'>) {
  return (
    <HeadingText
      as="h5"
      data-slot="alert-title"
      className={typographyCn(
        'text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit',
        typographyCn('mb-1 leading-none font-medium tracking-tight', className)
      )}
      {...props}
    />
  );
}
function AlertDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        bodyTextVariants(),
        'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
        cn('text-sm [&_p]:leading-relaxed', className)
      )}
      {...props}
    />
  );
}
export { Alert, AlertTitle, AlertDescription };
