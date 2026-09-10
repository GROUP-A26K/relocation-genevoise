import Image from 'next/image';
import { Phone, PhoneCall, X } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import Logo from '@/assets/img/logos/rg-logo.svg';
import MenuIcon from '@/assets/img/icons/menu-icon.webp';
import IconButton from '@/components/customs/IconButton';
import { Accordion } from '@/components/ui/accordion-custom';
import { renderMobileMenuItem } from '@/components/blocks/MenuItem/MobileMenuItem';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet-custom';

import { LanguageSelector } from './LanguageSelector';

import type { NavbarProps } from './NavbarContainer';

const MobileMenu = ({ menu, callButton, contactButton }: NavbarProps) => {
  return (
    <nav className="z-20 h-[72px] w-full bg-white px-4 md:px-4 nav:hidden">
      <div className="relative flex h-full w-full min-w-[205px] items-center justify-between">
        <Link href="/" className="pointer-events-auto flex items-center gap-2">
          <Image
            src={Logo.src}
            alt="Relocation Genevoise, courtier en Relocation à Genève"
            title="Relocation Genevoise, courtier en Relocation à Genève"
            width={57}
            height={21.97}
            className="min-w-[57px]"
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild className="absolute right-0 z-20">
            <span className="group">
              <IconButton
                variant="lg"
                type="primary"
                as="solid"
                className="pointer-events-auto rounded-none border-2 border-white bg-white text-black-500 shadow-none group-data-[state='open']:hidden hover:bg-white! active:bg-white!"
                icon={() => (
                  <Image
                    height={22}
                    width={22}
                    src={MenuIcon.src}
                    alt="X logo"
                    title="X logo"
                  />
                )}
              />
            </span>
          </SheetTrigger>

          <div className="flex flex-row gap-3">
            <Link
              href="tel:+41 22 715 17 48"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SheetClose asChild>
                <Button
                  as="ghost"
                  variant="md"
                  type="secondary"
                  className="pointer-events-auto w-full border-2 border-white whitespace-normal"
                  iconStart={PhoneCall}
                >
                  <div className="line-clamp-1">+41 22 715 17 48</div>
                </Button>
              </SheetClose>
            </Link>
            <SheetClose asChild>
              <IconButton
                variant="lg"
                type="primary"
                as="solid"
                className="pointer-events-auto rounded-[0.5rem] border-2 border-white bg-black-500 text-white shadow-none group-data-[state='closed']:hidden hover:bg-black-500! active:bg-black-500!"
                icon={X}
              />
            </SheetClose>
          </div>

          <SheetPortal>
            <SheetOverlay />
            <SheetContent
              side="top"
              className="absolute z-10 max-h-screen w-full overflow-scroll p-0 pt-[72px] nav:hidden"
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
                    href={callButton?.url ?? '/rappelez-moi'}
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
            </SheetContent>
          </SheetPortal>
        </Sheet>
      </div>
    </nav>
  );
};

export { MobileMenu };
