'use client';
import { FC, useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-changelog-custom';
import { useScrollspy } from '@/hooks/useScrollspy';
import debounce from 'lodash.debounce';
import { cn } from '@/libs/utils';

export interface ContentProps {
  position?: string;
  items: {
    title: string;
    description: string;
    image: string;
  }[];
}

export const Content: FC<ContentProps> = ({ items }) => {
  const { activeId } = useScrollspy(
    [...items.map((item, index) => `item-${index}`)],
    500
  );
  const [activeIndex, setActiveIndex] = useState<string>(`item-0`);

  const setActiveIdDebounced = useCallback(
    debounce(() => {
      setActiveIndex(activeId);
    }, 1),
    [activeId]
  );
  useEffect(() => {
    setActiveIdDebounced();
  }, [activeId, setActiveIdDebounced]);

  return (
    <div className="top-0 flex flex-col items-center justify-center md:ml-0 ml-14">
      <div className="mx-auto w-full 2xl:max-w-[672px] xl:max-w-[620px] max-w-[672px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col items-end">
        <div className="w-full max-w-[560px] flex">
          <div className="flex flex-col gap-16">
            <div className="relative flex flex-col gap-8">
              <Accordion type="single" value={activeIndex} className="relative">
                {items?.map((item, index) => (
                  <div key={index}>
                    <AccordionItem
                      value={`item-${index}`}
                      className="relative border-b-0"
                    >
                      <div className="absolute top-0 h-full w-[3px] -left-10 md:block lg:-left-16">
                        <div className="h-full w-full rounded-full bg-muted">
                          <div
                            className={cn(
                              'relative max-h-full h-full w-full rounded-full transition-all duration-700',
                              activeIndex.includes(`item-${index}`)
                                ? 'bg-yellow-500'
                                : 'bg-grey-100'
                            )}
                          />
                        </div>
                      </div>
                      <span
                        className={cn(
                          'absolute top-0 lg:size-12 size-10 -translate-x-1/2 rounded-full border border-grey-100 text-center items-center justify-center flex bg-background -left-10 md:grid lg:-left-16 transition-all duration-700',
                          activeIndex.includes(`item-${index}`)
                            ? 'bg-yellow-500 border-yellow-500'
                            : ''
                        )}
                      >
                        {index + 1}
                      </span>

                      <div className="flex flex-col max-w-fit pb-8">
                        <AccordionTrigger className="flex flex-col lg:gap-3 gap-4 text-left">
                          <div className="flex flex-col lg:gap-3 gap-4 max-w-[560px] text-left">
                            <div className="flex flex-col gap-3">
                              <h2
                                className="lg:text-xl text-lg font-semibold !leading-[130%]"
                                id={`item-${index}`}
                              >
                                {item.title}
                              </h2>
                            </div>
                            <h3 className="text-sm font-normal text-black-200 !leading-[130%]">
                              {item.description}
                            </h3>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-0 pt-10 max-w-[720px] flex justify-center h-fit text-sm text-black-200 !leading-[130%] duration-700">
                          <Image
                            src={item.image}
                            alt={item.title}
                            title={item.description}
                            width={326.4}
                            height={240}
                            className="aspect-video lg:min-h-[240px] min-h-[160px] w-fit rounded-md"
                          />
                        </AccordionContent>
                      </div>
                    </AccordionItem>
                  </div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
