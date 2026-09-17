import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from './utils';

import type { ComponentPropsWithRef } from 'react';

export const bodyTextVariants = cva(
  'font-normal leading-[130%] text-black-200',
  {
    variants: {
      variant: {
        xl: 'text-[20px]',
        lg: 'text-[18px]',
        md: 'text-[16px]',
        sm: 'text-[14px]',
        xs: 'text-[12px]',
      },
    },
    defaultVariants: {
      variant: 'md',
    },
  }
);

interface IBodyTextProps
  extends
    Omit<ComponentPropsWithRef<'p'>, 'ref'>,
    VariantProps<typeof bodyTextVariants> {
  asChild?: boolean;
  ref?: React.Ref<HTMLElement>;
}

export default function BodyText({
  asChild = false,
  variant,
  className,
  ref,
  ...props
}: IBodyTextProps) {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      {...props}
      ref={ref as React.Ref<HTMLParagraphElement>}
      className={cn(bodyTextVariants({ variant }), className)}
    />
  );
}
