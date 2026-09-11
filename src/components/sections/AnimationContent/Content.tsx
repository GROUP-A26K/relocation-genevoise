'use client';

import { useId, useMemo } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { motion, useReducedMotion } from 'motion/react';

import { cn } from '@/libs/utils';
import { useScroll } from '@/hooks/useScroll';
import { RevealItem } from '@/components/customs/Reveal';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-changelog';

import { StepContent } from './StepContent';

export interface IContentProps {
  position?: string;
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const Content: React.FC<IContentProps> = ({ items }) => {
  const id = useId();

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const itemIds = useMemo(
    () => items.map((_, index) => `${id}-item-${index}`),
    [id, items]
  );

  const { activeId, setActiveId } = useScroll(itemIds, isMobile ? 48 : 32, {
    headerSelector: '[data-site-header]',
    preserveScrollPosition: true,
  });

  const shouldReduceMotion = useReducedMotion();

  const activeStep = itemIds.indexOf(activeId);

  return (
    <div className="top-0 ml-14 flex flex-col items-center justify-center md:ml-0">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-end gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-155 2xl:max-w-2xl">
        <RevealItem className="flex w-full max-w-140">
          <div className="flex flex-col gap-16">
            <div className="relative flex flex-col gap-8">
              <Accordion
                type="single"
                value={activeId}
                onValueChange={setActiveId}
                className="relative [overflow-anchor:none]"
              >
                {items?.map((item, index) => (
                  <AccordionItem
                    value={itemIds[index]}
                    className="relative border-b-0 pb-12 last:pb-6 lg:pb-8 lg:last:pb-0"
                    key={index}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute top-0 -left-10 h-full w-0.75 md:block lg:-left-16"
                    >
                      <div className="h-full w-full rounded-full bg-muted">
                        <motion.div
                          className="relative h-full max-h-full w-full origin-top rounded-full bg-yellow-500"
                          initial={false}
                          animate={{ scaleY: index <= activeStep ? 1 : 0 }}
                          transition={
                            shouldReduceMotion
                              ? { duration: 0 }
                              : {
                                  type: 'spring',
                                  stiffness: 120,
                                  damping: 20,
                                  mass: 0.8,
                                }
                          }
                        />
                      </div>
                    </div>
                    <span
                      aria-current={index === activeStep ? 'step' : undefined}
                      className={cn(
                        'absolute top-0 -left-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-grey-100 bg-background text-center transition-colors duration-200 motion-reduce:transition-none md:grid lg:-left-16 lg:size-12',
                        index <= activeStep
                          ? 'border-yellow-500 bg-yellow-500'
                          : ''
                      )}
                    >
                      {index + 1}
                    </span>

                    <div className="flex max-w-fit flex-col">
                      <AccordionTrigger className="flex flex-col gap-4 text-left lg:gap-3">
                        <div className="flex max-w-140 flex-col gap-4 text-left lg:gap-3">
                          <div className="flex flex-col gap-3">
                            <h2
                              className="text-lg leading-[130%]! font-semibold lg:text-xl"
                              id={itemIds[index]}
                            >
                              {item.title}
                            </h2>
                          </div>
                          <h3 className="text-sm leading-[130%]! font-normal text-black-200">
                            {item.description}
                          </h3>
                        </div>
                      </AccordionTrigger>
                      <StepContent
                        isActive={index === activeStep}
                        title={item.title}
                        description={item.description}
                        image={item.image}
                      />
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </RevealItem>
      </div>
    </div>
  );
};
