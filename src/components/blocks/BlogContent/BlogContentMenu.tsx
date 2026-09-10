'use client';

import { type FC, useEffect, useRef } from 'react';

import { cn } from '@/libs/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const listElement = listRef.current;
    if (!listElement || listElement.offsetParent === null) return;

    const activeItemElement = document.getElementById(
      `toc-item-${props.activeId}`
    );
    if (!activeItemElement || !listElement.contains(activeItemElement)) return;

    const listRect = listElement.getBoundingClientRect();
    const itemRect = activeItemElement.getBoundingClientRect();
    const isOutsideListViewport =
      itemRect.top < listRect.top || itemRect.bottom > listRect.bottom;

    if (!isOutsideListViewport) return;

    activeItemElement.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }, [props.activeId]);

  return (
    <div className="hidden w-fit flex-col gap-8 lg:flex">
      {props?.isTableContent && (
        <div className="text-base leading-[130%]! font-semibold text-black-500 lg:text-xl">
          {props.title && props.title}
        </div>
      )}
      <div
        className={cn(
          'relative',
          "before:absolute before:inset-y-0 before:left-0 before:w-0.5 before:bg-grey-50 before:content-['']",
          'before:z-[-1]'
        )}
      >
        <ul
          ref={listRef}
          className="scrollbar-hide flex max-h-[calc(100dvh-6rem)] w-full flex-col gap-1 overflow-y-auto lg:max-w-[160px] xl:max-w-[263px]"
        >
          {props.menuItems.map((item) => (
            <li
              id={`toc-item-${item.id}`}
              key={`menu-item-${item.id}`}
              className={cn(
                'px-4 py-3 transition-all duration-200 ease-in-out',
                'border-l-2 border-solid border-transparent',
                {
                  'border-secondary-500 bg-secondary-25':
                    item.id === props.activeId,
                }
              )}
            >
              <a
                href={`#${item.id}`}
                title={item.title}
                onClick={() => props.setActiveId(item.id)}
                className={cn(
                  'line-clamp-4 text-base leading-[130%]! font-normal text-wrap text-black-200 transition-colors duration-200 ease-in-out',
                  {
                    'font-semibold text-primary-500':
                      item.id === props.activeId,
                  }
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
  const isMobile = useMediaQuery('(max-width: 1024px)');
  if (!isMobile) return null;
  return (
    <div className="w-full lg:hidden">
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-2xl bg-grey-50"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger className="px-4 py-3 hover:no-underline">
            {props?.isTableContent ? (
              <div className="flex text-base leading-[130%]! font-semibold text-black-200 lg:text-xl">
                {props.title && props.title}
              </div>
            ) : (
              <div className="flex text-base leading-[130%]! font-semibold text-black-200 lg:text-xl">
                Menu
              </div>
            )}
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 px-4 pb-3 text-balance">
            <ul className="menu flex w-full flex-col gap-3 border-t-2 border-grey-200 pt-3 lg:max-w-[160px] xl:max-w-[200px] 2xl:max-w-[228px]">
              {props.menuItems.map((item) => (
                <li key={`menu-item-${item.id}`} className="menu-item flex">
                  <a
                    href={`#${item.id}`}
                    title={item.title}
                    onClick={() => props.setActiveId(item.id)}
                    className={cn(
                      'menu-link line-clamp-2 text-base leading-[130%]! font-semibold text-wrap text-black-200',
                      item.id === props.activeId &&
                        'border-l-4 border-primary-500 pl-4 text-black-500'
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
