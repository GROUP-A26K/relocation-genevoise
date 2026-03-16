"use client";

import { cn } from "@/libs/utils";
import { FC, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Props {
  title?: string;
  activeId: string;
  setActiveId: (id: string) => void;
  menuItems: { id: string; title: string }[];
  isTableContent?: boolean;
}

const DesktopMenu: FC<Props> = (props) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!props.activeId) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;

    const listElement = listRef.current;
    if (!listElement || listElement.offsetParent === null) return;

    const activeItemElement = document.getElementById(
      `toc-item-${props.activeId}`,
    );
    if (!activeItemElement || !listElement.contains(activeItemElement)) return;

    const listRect = listElement.getBoundingClientRect();
    const itemRect = activeItemElement.getBoundingClientRect();
    const isOutsideListViewport =
      itemRect.top < listRect.top || itemRect.bottom > listRect.bottom;

    if (!isOutsideListViewport) return;

    activeItemElement.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, [props.activeId]);

  return (
    <div className="lg:flex flex-col gap-8 w-fit hidden">
      {props?.isTableContent && (
        <div className="lg:text-xl text-base text-black-500 font-semibold !leading-[130%]">
          {props.title && props.title}
        </div>
      )}
      <div
        className={cn(
          "relative",
          "before:absolute before:left-0 before:inset-y-0 before:w-0.5 before:bg-grey-50 before:content-['']",
          "before:z-[-1]",
        )}
      >
        <ul
          ref={listRef}
          className="flex flex-col gap-1 xl:max-w-[263px] lg:max-w-[160px] w-full max-h-[calc(100dvh-6rem)] overflow-y-auto scrollbar-hide"
        >
          {props.menuItems.map((item) => (
            <li
              id={`toc-item-${item.id}`}
              key={`menu-item-${item.id}`}
              className={cn(
                "px-4 py-3 transition-all duration-200 ease-in-out",
                "border-l-2 border-solid border-transparent",
                {
                  "border-secondary-500 bg-secondary-25":
                    item.id === props.activeId,
                },
              )}
            >
              <a
                href={`#${item.id}`}
                title={item.title}
                onClick={() => props.setActiveId(item.id)}
                className={cn(
                  "text-base text-black-200 font-normal !leading-[130%] line-clamp-4 text-wrap transition-colors duration-200 ease-in-out",
                  {
                    "text-primary-500 font-semibold":
                      item.id === props.activeId,
                  },
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const MobileMenu: FC<Props> = (props) => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  if (!isMobile) return null;
  return (
    <div className="w-full lg:hidden">
      <Accordion
        type="single"
        collapsible
        className="w-full bg-grey-50 rounded-2xl"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            {props?.isTableContent ? (
              <div className="flex lg:text-xl text-base text-black-200 font-semibold !leading-[130%]">
                {props.title && props.title}
              </div>
            ) : (
              <div className="flex lg:text-xl text-base text-black-200 font-semibold !leading-[130%]">
                Menu
              </div>
            )}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance px-4 pb-3">
            <ul className="menu flex flex-col gap-3 2xl:max-w-[228px] xl:max-w-[200px] lg:max-w-[160px] w-full border-t-2 border-grey-200 pt-3">
              {props.menuItems.map((item) => (
                <li key={`menu-item-${item.id}`} className="menu-item flex">
                  <a
                    href={`#${item.id}`}
                    title={item.title}
                    onClick={() => props.setActiveId(item.id)}
                    className={cn(
                      "menu-link text-base text-black-200 font-semibold !leading-[130%] line-clamp-2 text-wrap",
                      item.id === props.activeId &&
                        "text-black-500 pl-4 border-l-4 border-primary-500"
                    )}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export const BlogContentMenu: FC<Props> = (props) => {
  return (
    <>
      <DesktopMenu {...props} />
      <MobileMenu {...props} />
    </>
  );
};
