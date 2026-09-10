import { Phone } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import Button from '@/components/customs/Button';
import LogoIcon from '@/components/icons/LogoIcon';
import { renderMenuItem } from '@/components/blocks/MenuItem';

import PhoneButton from './PhoneButton';
import { LanguageSelector } from './LanguageSelector';
import MotionNavigationMenu from './MotionNavigationMenu';

import type { INavbarProps } from './NavbarContainer';

const DesktopMenu = async ({ menu, callButton, locale }: INavbarProps) => {
  const menuItems = await Promise.all(
    menu.map((item) => renderMenuItem(item, locale))
  );
  const routeItems = menu.map((item) => ({
    key: item.title,
    paths: [item.url, ...(item.items?.map((subItem) => subItem.url) ?? [])],
  }));

  return (
    <nav className="hidden justify-between nav:flex">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/">
            <LogoIcon height={27} />
          </Link>
          <MotionNavigationMenu
            className="static nav:block"
            listClassName="gap-2 xl:gap-8"
            routeItems={routeItems}
          >
            {menuItems}
          </MotionNavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <PhoneButton phoneNumber="+41 22 715 17 48" />
          <LanguageSelector />
          <Link
            href={callButton?.url ?? '/call-me-back'}
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
