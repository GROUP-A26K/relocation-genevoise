import { MobileMenu } from './MobileMenu';
import { DesktopMenu } from './DesktopMenu';
export interface MenuItem {
  title: string;
  subtitle?: string;
  url: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  items?: MenuItem[];
}
export interface NavbarProps {
  menu: MenuItem[];
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
}: NavbarProps) => {
  return (
    <header className="relative flex flex-col items-center justify-center">
      <nav className="container px-[48px] md:max-w-(--breakpoint-md) lg:max-w-(--breakpoint-xl) xl:max-w-(--breakpoint-2xl) xl:px-[60px] 2xl:max-w-(--breakpoint-2xl) 2xl:px-[100px]">
        <DesktopMenu menu={menu} callButton={callButton} locale={locale} />
      </nav>
      <MobileMenu
        menu={menu}
        callButton={callButton}
        contactButton={contactButton}
      />
    </header>
  );
};

export { NavbarContainer };
