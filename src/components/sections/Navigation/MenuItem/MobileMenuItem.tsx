import { SheetClose } from '@/components/ui/sheet';
import { BodyText } from '@/components/common/Text';
import { Link, type THref } from '@/libs/i18nNavigation';
import { SubMenuLink } from '@/components/sections/Navigation/MenuItem/SubMenuLink';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-nav';

export type TMobileMenuItem = {
  title: string;
  url?: THref;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: TMobileMenuItem[];
};

export const renderMobileMenuItem = (item: TMobileMenuItem) => {
  if (item.items) {
    return (
      <AccordionItem
        key={item.title}
        value={item.title}
        className="border-b-0 p-[16px] data-[state=open]:pb-0"
      >
        <AccordionTrigger className="text-md py-0 font-bold outline-hidden hover:no-underline data-[state=open]:border-b data-[state=open]:pb-[16px] data-[state=open]:text-primary-500 [&[data-state=open]>svg]:text-primary-500">
          <BodyText
            asChild
            className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit"
          >
            <div>{item.title}</div>
          </BodyText>
        </AccordionTrigger>
        <AccordionContent className="mt-2 pb-0">
          {item.items.map((subItem) => (
            <Link href={subItem.url ?? '/'} key={subItem.title}>
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
    <Link href={item.url ?? '/'} key={item.title}>
      <SheetClose asChild>
        <BodyText
          asChild
          className="p-[16px] text-[length:inherit] leading-[inherit] font-semibold text-inherit"
        >
          <div>{item.title}</div>
        </BodyText>
      </SheetClose>
    </Link>
  );
};
