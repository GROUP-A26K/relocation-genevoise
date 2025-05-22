import { Building, Earth, Scale, ShieldHalf, Heart } from "lucide-react";
import { FC } from "react";
import { NavbarContainer, NavbarProps } from "./NavbarContainer";
import { getTranslations } from "next-intl/server";

const Navbar: FC<{ locale: string }> = async ({ locale }) => {
  const tNav = await getTranslations({
    locale,
    namespace: "Navbar",
  });
  const navLinks: NavbarProps = {
    menu: [
      {
        title: tNav("menu.0.title"),
        url: "/trouver-un-logement",
      },
      {
        title: tNav("menu.1.title"),
        url: "/contact",
      },
      {
        title: tNav("menu.2.title"),
        url: "/contact",
      },
      {
        title: tNav("menu.3.title"),
        url: "#",
        items: [
          {
            title: tNav("menu.3.items.0.title"),
            description: tNav("menu.3.items.0.description"),
            icon: Building,
            url: "/professionnel/entreprise",
          },
          {
            title: tNav("menu.3.items.1.title"),
            description: tNav("menu.3.items.1.description"),
            icon: Earth,
            url: "/services/concierge-service",
          },
          {
            title: tNav("menu.3.items.2.title"),
            description: tNav("menu.3.items.2.description"),
            icon: ShieldHalf,
            url: "/services/discover-geneva",
          },
          {
            title: tNav("menu.3.items.3.title"),
            description: tNav("menu.3.items.3.description"),
            icon: Scale,
            url: "/professionnel/entreprise",
          },
          {
            title: tNav("menu.3.items.4.title"),
            description: tNav("menu.3.items.4.description"),
            icon: Heart,
            url: "/services/education",
          },
        ],
      },
    ],
    callButton: {
      text: tNav("callButton.text"),
      url: "/rappelez-moi",
    },
  };

  return (
    <NavbarContainer
      menu={navLinks.menu}
      callButton={navLinks.callButton}
      locale={locale}
    />
  );
};

export { Navbar };
