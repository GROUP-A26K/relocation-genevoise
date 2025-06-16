import { cn } from '@/libs/utils';
import { FC } from 'react';
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
  return (
    <div className="lg:flex flex-col gap-4 w-fit hidden">
      {props?.isTableContent && (
        <div className="flex lg:text-xl text-base text-black-500 font-semibold !leading-[130%]">
          {props.title && props.title}
        </div>
      )}
      <ul className="menu flex flex-col gap-3 2xl:max-w-[228px] xl:max-w-[200px] lg:max-w-[160px] w-full">
        {props.menuItems.map((item) => (
          <li key={`menu-item-${item.id}`} className="menu-item flex">
            <a
              href={`#${item.id}`}
              title={item.title}
              onClick={() => props.setActiveId(item.id)}
              className={cn(
                'menu-link text-base text-black-200 font-semibold !leading-[130%] line-clamp-2 text-wrap',
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
            <ul className="menu flex flex-col gap-3 2xl:max-w-[228px] xl:max-w-[200px] lg:max-w-[160px] w-full border-t-2 border-grey-100 pt-3">
              {props.menuItems.map((item) => (
                <li key={`menu-item-${item.id}`} className="menu-item flex">
                  <a
                    href={`#${item.id}`}
                    title={item.title}
                    onClick={() => props.setActiveId(item.id)}
                    className={cn(
                      'menu-link text-base text-black-200 font-semibold !leading-[130%] line-clamp-2 text-wrap',
                      item.id === props.activeId &&
                        'text-black-500 pl-4 border-l-4 border-primary-500'
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
