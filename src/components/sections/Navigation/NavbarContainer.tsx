import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
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
    <header className="relative flex flex-col justify-center items-center">
      <nav className="container 2xl:max-w-screen-2xl xl:max-w-screen-2xl lg:max-w-screen-xl md:max-w-screen-md 2xl:px-[100px] xl:px-[60px] px-[48px]">
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
