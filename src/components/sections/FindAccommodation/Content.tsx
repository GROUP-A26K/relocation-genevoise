"use client";
import { FC, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion-changelog-custom";
import { useScrollspy } from "@/hooks/useScrollspy";
import debounce from "lodash.debounce";
import { cn } from "@/libs/utils";

interface ContentProps {
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
  const [activeIndex, setActiveIndex] = useState<string[]>([]);
  const setActiveIdDebounced = useCallback(
    debounce(() => {
      setActiveIndex((prev: string[]) => {
        const currentIndex = parseInt((activeId || "item-0").split("-")[1], 10);

        if (
          prev.length === currentIndex + 1 &&
          prev[currentIndex] === `item-${currentIndex}`
        ) {
          return prev;
        }

        return Array.from({ length: currentIndex + 1 }, (_, i) => `item-${i}`);
      });
    }, 10),
    [activeId]
  );
  useEffect(() => {
    setActiveIdDebounced();
  }, [activeId, setActiveIdDebounced]);

  return (
    <div className="top-0 flex flex-col items-center justify-center">
      <div className="mx-auto w-full 2xl:max-w-[672px] xl:max-w-[620px] max-w-[672px] gap-x-8 gap-y-8 lg:mx-0 lg:grid-cols-3 flex flex-col items-end">
        <div className="w-full max-w-[560px] flex">
          <div className="flex flex-col gap-16">
            <div className="relative flex flex-col gap-8">
              <Accordion
                type="multiple"
                value={activeIndex}
                className="relative"
              >
                {items?.map((item, index) => (
                  <div key={index} id={`item-${index}`}>
                    {" "}
                    <AccordionItem
                      value={`item-${index}`}
                      className="relative border-b-0"
                    >
                      <div className="absolute top-0 hidden h-full w-[3px] md:-left-12 md:block lg:-left-16">
                        <div className="h-full w-full rounded-full bg-muted">
                          <div
                            className={cn(
                              "relative max-h-full h-full w-full rounded-full transition-all duration-300",
                              activeIndex.includes(`item-${index}`)
                                ? "bg-yellow-500"
                                : "bg-grey-100"
                            )}
                          />
                        </div>
                      </div>
                      <span
                        className={cn(
                          "absolute top-0 hidden size-12 -translate-x-1/2 place-items-center rounded-full border border-grey-100 bg-background md:-left-12 md:grid lg:-left-16",
                          activeIndex.includes(`item-${index}`)
                            ? "bg-yellow-500 border-yellow-500"
                            : ""
                        )}
                      >
                        {index + 1}
                      </span>

                      <div className="flex flex-col max-w-fit gap-8 pb-8">
                        <AccordionTrigger className="flex flex-col lg:gap-3 gap-4 max-w-[560px] text-left">
                          <div className="flex flex-col lg:gap-3 gap-4 max-w-[560px] text-left">
                            <div className="flex flex-col gap-3">
                              <h2 className="text-xl font-semibold !leading-[130%]">
                                {item.title}
                              </h2>
                            </div>
                            <p className="text-sm font-normal text-black-200 !leading-[130%]">
                              {item.description}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="py-0 pt-2 max-w-[720px] text-sm text-black-200 !leading-[130%]">
                          <Image
                            src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80"
                            alt="placeholder"
                            width={560}
                            height={280}
                            className="aspect-video rounded-md border border-border object-cover"
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
