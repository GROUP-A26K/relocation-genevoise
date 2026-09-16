import NextLink from 'next/link';
import { Phone, PhoneCall } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/common/Button';
import LogoIcon from '@/components/icons/LogoIcon';
import { Accordion } from '@/components/ui/accordion-custom';
import { CONTACT_PHONE_HREF, ORGANIZATION } from '@/constants/seo';
import { SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { LanguageSelector } from '@/components/common/Language/LanguageSelector';

import { renderMobileMenuItem } from './MenuItem';
import { MobileMenuSheet } from './MobileMenuSheet';

import type { INavbarContainerProps } from './NavbarContainer';

const MobileMenu = ({
  menu,
  callButton,
  contactButton,
}: INavbarContainerProps) => {
  return (
    <nav className="z-20 h-18 w-full bg-white px-4 md:px-4 nav:hidden">
      <div className="relative flex h-full w-full min-w-51.25 items-center justify-between">
        <Link href="/">
          <LogoIcon height={22} />
        </Link>
        <MobileMenuSheet
          phoneAction={
            <NextLink href={CONTACT_PHONE_HREF}>
              <SheetClose asChild>
                <Button
                  as="ghost"
                  variant="md"
                  type="secondary"
                  className="pointer-events-auto w-full border-2 border-white whitespace-normal"
                  iconStart={PhoneCall}
                >
                  <div className="line-clamp-1">{ORGANIZATION.telephone}</div>
                </Button>
              </SheetClose>
            </NextLink>
          }
        >
          <SheetHeader>
            <SheetTitle />
          </SheetHeader>
          <div className="flex flex-col">
            <Accordion
              type="single"
              collapsible
              className="flex w-full flex-col"
            >
              {menu.map((item) => renderMobileMenuItem(item))}
            </Accordion>
            <LanguageSelector className="bg-transparent shadow-none hover:bg-transparent active:bg-transparent" />

            <div className="flex flex-col gap-3 p-3">
              <Link
                href={contactButton?.url ?? '/contact'}
                className="flex items-center"
              >
                <SheetClose asChild>
                  <Button
                    as="solid"
                    variant="md"
                    type="primary"
                    className="w-full"
                  >
                    {contactButton?.text}
                  </Button>
                </SheetClose>
              </Link>
              <Link
                href={callButton?.url ?? '/call-me-back'}
                className="flex items-center"
              >
                <SheetClose asChild>
                  <Button
                    as="outline"
                    variant="md"
                    type="primary"
                    className="w-full"
                    iconStart={Phone}
                  >
                    {callButton?.text}
                  </Button>
                </SheetClose>
              </Link>
            </div>
          </div>
        </MobileMenuSheet>
      </div>
    </nav>
  );
};

export { MobileMenu };
