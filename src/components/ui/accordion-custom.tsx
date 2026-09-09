'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { CircleMinus, CirclePlus } from 'lucide-react';
import { cn } from '@/libs/utils';

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('border-b', className)}
      {...props}
    />
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          'group text-black-500 flex w-full flex-1 items-start justify-between py-4 text-left text-sm font-medium transition-all',
          className
        )}
        {...props}
      >
        {children}
        <span className="ml-6 flex h-6 items-center">
          {/* <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state='open']:rotate-180" /> */}
          <CirclePlus
            aria-hidden="true"
            className="text-grey-500 size-6 rotate-180 transition-transform duration-500 group-data-open:hidden group-data-[state=open]:hidden"
          />
          <CircleMinus
            aria-hidden="true"
            className="text-grey-500 hidden size-6 rotate-180 transition-transform duration-500 group-data-[state=open]:block"
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}
function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn('pt-0 pb-4', className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
