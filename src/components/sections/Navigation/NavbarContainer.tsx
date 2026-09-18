import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
import NavigationHeader from './NavigationHeader';

import type { THref } from '@/libs/i18nNavigation';

export type TMenuItem = {
  title: string;
  subtitle?: string;
  url?: THref;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: TMenuItem[];
};

export interface INavbarContainerProps {
  menu: TMenuItem[];
  contactButton?: {
    text: string;
    url: THref;
  };
  callButton?: {
    text: string;
    url: THref;
  };

  locale?: string;
  logoLabel?: string;
}

const NavbarContainer = ({
  menu,
  callButton,
  locale,
  contactButton,
  logoLabel,
}: INavbarContainerProps) => {
  return (
    <NavigationHeader>
      <nav className="container px-12 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) xl:max-w-(--breakpoint-2xl) xl:px-15 2xl:max-w-(--breakpoint-2xl) 2xl:px-25">
        <DesktopMenu
          menu={menu}
          callButton={callButton}
          locale={locale}
          logoLabel={logoLabel}
        />
      </nav>
      <MobileMenu
        menu={menu}
        callButton={callButton}
        contactButton={contactButton}
        logoLabel={logoLabel}
      />
    </NavigationHeader>
  );
};

export { NavbarContainer };
