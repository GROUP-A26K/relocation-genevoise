import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from './utils';

import type { ComponentPropsWithRef } from 'react';

export const headingTextVariants = cva(
  'font-semibold leading-[130%] text-black-500',
  {
    variants: {
      as: {
        h1: 'text-[48px] font-bold',
        h2: 'text-[40px] font-bold',
        h3: 'text-[24px]',
        h4: 'text-[20px]',
        h5: 'text-[18px]',
        h6: 'text-[16px]',
      },
    },
    defaultVariants: {
      as: 'h2',
    },
  }
);

type THeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface IHeadingTextProps extends ComponentPropsWithRef<'h2'> {
  as?: THeadingTag;
  asChild?: boolean;
}

export default function HeadingText({
  as = 'h2',
  asChild = false,
  className,
  ...props
}: IHeadingTextProps) {
  const Comp = asChild ? Slot : as;

  return (
    <Comp {...props} className={cn(headingTextVariants({ as }), className)} />
  );
}
