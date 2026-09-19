import { Phone } from 'lucide-react';

import { Link } from '@/libs/i18nNavigation';
import { ORGANIZATION } from '@/constants/seo';
import Button from '@/components/common/Button';
import LogoIcon from '@/components/icons/LogoIcon';
import { LanguageSelector } from '@/components/common/Language/LanguageSelector';

import PhoneButton from './PhoneButton';
import { renderMenuItem } from './MenuItem';
import MotionNavigationMenu from './MotionNavigationMenu';

import type { INavbarContainerProps } from './NavbarContainer';

const DesktopMenu = async ({
  menu,
  callButton,
  locale,
  logoLabel,
}: INavbarContainerProps) => {
  const menuItems = await Promise.all(
    menu.map((item) => renderMenuItem(item, locale))
  );
  const routeItems = menu.map((item) => ({
    key: item.title,
    paths: [
      item.url,
      ...(item.items?.map((subItem) => subItem.url) ?? []),
    ].filter((path) => typeof path === 'string'),
  }));

  return (
    <nav className="hidden justify-between nav:flex">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" aria-label={logoLabel}>
            <LogoIcon height={27} aria-hidden="true" focusable="false" />
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
          <PhoneButton phoneNumber={ORGANIZATION.telephone} />
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
