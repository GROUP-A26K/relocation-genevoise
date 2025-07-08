import { SubMenuLink } from '@/components/customs/SubMenuLink';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-nav-custom';
import { SheetClose } from '@/components/ui/sheet-custom';
import { Link } from '@/libs/i18nNavigation';

export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: MenuItem[];
}

export const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b-0 p-[16px] [&[data-state=open]]:pb-0"
      >
        <AccordionTrigger className="text-md py-0 font-bold hover:no-underline [&[data-state=open]]:pb-[16px] [&[data-state=open]]:border-b-[1px] [&[data-state=open]>svg]:!text-primary-500 [&[data-state=open]]:!text-primary-500 !outline-none">
          <div>{item.title}</div>
        </AccordionTrigger>
        <AccordionContent className="mt-2 pb-0">
          {/* <p className="text-[12px] font-medium uppercase !leading-[130%] pt-[8px] pb-[6px]">
            {item.title}
          </p> */}
          {item.items.map((subItem) => (
            <Link href={subItem.url} key={subItem.title}>
              <SheetClose asChild>
                <SubMenuLink key={subItem.title} {...subItem} variant="md" />
              </SheetClose>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link href={item.url} key={item.title}>
      <SheetClose asChild>
        <div className="text-md font-semibold p-[16px]">{item.title}</div>
      </SheetClose>
    </Link>
  );
};
