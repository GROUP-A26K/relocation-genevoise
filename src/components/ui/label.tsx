'use client';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/utils';
import { bodyTextVariants } from '@/components/common/Text/BodyText';

const labelVariants = cva(
  cn(
    bodyTextVariants(),
    'text-[length:inherit] leading-[calc(1.25/0.875)] font-[number:inherit] text-inherit',
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
  )
);

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(labelVariants(), className)}
      {...props}
    />
  );
}
export { Label };
