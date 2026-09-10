'use client';
import Image from 'next/image';
import debounce from 'lodash.debounce';
import { type FC, useEffect, useMemo, useState } from 'react';

import { cn } from '@/libs/utils';
import { useScroll } from '@/hooks/useScroll';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-changelog-custom';

export interface ContentProps {
  position?: string;
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const Content: FC<ContentProps> = ({ items }) => {
  const { activeId } = useScroll(
    [...items.map((item, index) => `item-${index}`)],
    500
  );
  const [activeIndex, setActiveIndex] = useState<string>(`item-0`);

  const setActiveIdDebounced = useMemo(
    () => debounce((id: string) => setActiveIndex(id), 1),
    []
  );

  useEffect(() => {
    setActiveIdDebounced(activeId);
  }, [activeId, setActiveIdDebounced]);

  useEffect(() => () => setActiveIdDebounced.cancel(), [setActiveIdDebounced]);

  return (
    <div className="top-0 ml-14 flex flex-col items-center justify-center md:ml-0">
      <div className="mx-auto flex w-full max-w-[672px] flex-col items-end gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 xl:max-w-[620px] 2xl:max-w-[672px]">
        <div className="flex w-full max-w-[560px]">
          <div className="flex flex-col gap-16">
            <div className="relative flex flex-col gap-8">
              <Accordion type="single" value={activeIndex} className="relative">
                {items?.map((item, index) => (
                  <AccordionItem
                    value={`item-${index}`}
                    className="relative border-b-0 pb-8 last:pb-0"
                    key={index}
                  >
                    <div className="absolute top-0 -left-10 h-full w-[3px] md:block lg:-left-16">
                      <div className="h-full w-full rounded-full bg-muted">
                        <div
                          className={cn(
                            'relative h-full max-h-full w-full rounded-full transition-all duration-700',
                            activeIndex.includes(`item-${index}`)
                              ? 'bg-yellow-500'
                              : 'bg-grey-100'
                          )}
                        />
                      </div>
                    </div>
                    <span
                      className={cn(
                        'absolute top-0 -left-10 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-grey-100 bg-background text-center transition-all duration-700 md:grid lg:-left-16 lg:size-12',
                        activeIndex.includes(`item-${index}`)
                          ? 'border-yellow-500 bg-yellow-500'
                          : ''
                      )}
                    >
                      {index + 1}
                    </span>

                    <div className="flex max-w-fit flex-col">
                      <AccordionTrigger className="flex flex-col gap-4 text-left lg:gap-3">
                        <div className="flex max-w-[560px] flex-col gap-4 text-left lg:gap-3">
                          <div className="flex flex-col gap-3">
                            <h2
                              className="text-lg leading-[130%]! font-semibold lg:text-xl"
                              id={`item-${index}`}
                            >
                              {item.title}
                            </h2>
                          </div>
                          <h3 className="text-sm leading-[130%]! font-normal text-black-200">
                            {item.description}
                          </h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex h-fit max-w-[720px] justify-center py-0 pt-10 text-sm leading-[130%]! text-black-200 duration-700">
                        <Image
                          src={item.image}
                          alt={item.title}
                          title={item.description}
                          width={560}
                          height={280}
                          className="aspect-video h-[200px] min-h-[200px] w-fit rounded-md sm:h-[280px] sm:min-h-[280px] lg:w-full"
                        />
                      </AccordionContent>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
