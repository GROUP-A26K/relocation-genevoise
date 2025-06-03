import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu-custom";
import { renderMenuItem } from "@/components/blocks/MenuItem";
import { Link } from "@/libs/i18nNavigation";
import { NavbarProps } from "./NavbarContainer";
import Image from "next/image";
import Logo from "@/assets/img/logos/rg-logo.svg";
import { LanguageSelector } from "./LanguageSelector";
import Button from "@/components/customs/Button";
import { Phone } from "lucide-react";

const DesktopMenu = ({ menu, callButton, locale }: NavbarProps) => {
  return (
    <nav className="hidden justify-between nav:flex">
      <div className="flex items-center justify-between w-full">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={Logo.src}
            alt="Assurance Genevoise, courtier en assurance à Genève"
            title="Assurance Genevoise, courtier en assurance à Genève"
            width={70}
            height={26.98}
            className="min-h-[26.98px] min-w-[70px]"
          />
        </Link>
        <NavigationMenu className="static nav:block">
          <NavigationMenuList className="xl:gap-8 gap-2">
            {menu.map((item) => renderMenuItem(item, locale))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Link
            href={callButton?.url ?? "/rappelez-moi"}
            className="flex items-center"
          >
            <Button as="solid" variant="md" type="primary" iconStart={Phone}>
              41 22 715 17 48
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export { DesktopMenu };
