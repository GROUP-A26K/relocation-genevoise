import { cn } from '@/libs/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import type { FC } from 'react';

interface Props {
  title?: string;
  activeId: string;
  setActiveId: (id: string) => void;
  menuItems: { id: string; title: string }[];
  isTableContent?: boolean;
}

const DesktopMenu: FC<Props> = (props) => {
  return (
    <div className="hidden w-fit flex-col gap-4 lg:flex">
      {props?.isTableContent && (
        <div className="flex text-base leading-[130%]! font-semibold text-black-500 lg:text-xl">
          {props.title && props.title}
        </div>
      )}
      <ul className="menu flex w-full flex-col gap-3 lg:max-w-[160px] xl:max-w-[200px] 2xl:max-w-[228px]">
        {props.menuItems.map((item) => (
          <li key={`menu-item-${item.id}`} className="menu-item flex">
            <a
              href={`#${item.id}`}
              title={item.title}
              onClick={() => props.setActiveId(item.id)}
              className={cn(
                'menu-link line-clamp-2 text-base leading-[130%]! font-semibold text-wrap text-black-200',
                item.id === props.activeId && 'text-primary-500'
              )}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
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
            <ul className="menu flex w-full flex-col gap-3 border-t-2 border-grey-100 pt-3 lg:max-w-[160px] xl:max-w-[200px] 2xl:max-w-[228px]">
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

export const ContentMenu: FC<Props> = (props) => {
  return (
    <>
      <DesktopMenu {...props} />
      <MobileMenu {...props} />
    </>
  );
};
