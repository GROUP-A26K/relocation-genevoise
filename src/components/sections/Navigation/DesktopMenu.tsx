import Image from 'next/image';
import { Phone } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import Logo from '@/assets/img/logos/rg-logo.svg';
import { renderMenuItem } from '@/components/blocks/MenuItem';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu-custom';

import { LanguageSelector } from './LanguageSelector';

import type { NavbarProps } from './NavbarContainer';

const DesktopMenu = ({ menu, callButton, locale }: NavbarProps) => {
  return (
    <nav className="hidden justify-between nav:flex">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={Logo.src}
              alt="Relocation Genevoise, courtier en relocation à Genève"
              title="Relocation Genevoise, courtier en relocation à Genève"
              width={70}
              height={26.98}
              className="min-h-[26.98px] min-w-[70px]"
            />
          </Link>
          <NavigationMenu className="static nav:block">
            <NavigationMenuList className="gap-2 xl:gap-8">
              {menu.map((item) => renderMenuItem(item, locale))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="tel:+41227151748"
            className="flex items-center no-underline"
          >
            <Button
              as="link"
              href="tel:+41227151748"
              variant="md"
              type="primary"
              iconStart={Phone}
              className="text-black-500 no-underline hover:text-black-500"
            >
              +41 22 715 17 48
            </Button>
          </Link>
          <LanguageSelector />
          <Link
            href={callButton?.url ?? '/rappelez-moi'}
            className="flex items-center"
          >
            <Button as="solid" variant="md" type="primary" iconStart={Phone}>
              {callButton?.text}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { DesktopMenu };
