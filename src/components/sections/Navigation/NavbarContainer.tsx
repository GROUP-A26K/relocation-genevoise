import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
import NavigationHeader from './NavigationHeader';

export type TMenuItem = {
  title: string;
  subtitle?: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: TMenuItem[];
};

export interface INavbarProps {
  menu: TMenuItem[];
  contactButton?: {
    text: string;
    url: string;
  };
  callButton?: {
    text: string;
    url: string;
  };

  locale?: string;
}

const NavbarContainer = ({
  menu,
  callButton,
  locale,
  contactButton,
}: INavbarProps) => {
  return (
    <NavigationHeader>
      <nav className="container px-12 md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) xl:max-w-(--breakpoint-2xl) xl:px-15 2xl:max-w-(--breakpoint-2xl) 2xl:px-25">
        <DesktopMenu menu={menu} callButton={callButton} locale={locale} />
      </nav>
      <MobileMenu
        menu={menu}
        callButton={callButton}
        contactButton={contactButton}
      />
    </NavigationHeader>
  );
};

export { NavbarContainer };
