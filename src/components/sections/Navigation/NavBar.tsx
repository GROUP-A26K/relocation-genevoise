import { getTranslations } from 'next-intl/server';
import {
  Backpack,
  Building,
  School,
  UserRoundSearch,
  House,
} from 'lucide-react';

import { NavbarContainer, type INavbarProps } from './NavbarContainer';

const Navbar: React.FC<{ locale: string }> = async ({ locale }) => {
  const tNav = await getTranslations({
    locale,
    namespace: 'Navbar',
  });
  const navLinks: INavbarProps = {
    menu: [
      {
        title: tNav('menu.0.title'),
        url: '/find-accommodation',
      },
      {
        title: tNav('menu.1.title'),
        url: '/find-a-tenant/landlords',
      },
      {
        title: tNav('menu.2.title'),
        subtitle: tNav('menu.2.subtitle'),
        url: '#',
        items: [
          {
            title: tNav('menu.2.items.0.title'),
            description: tNav('menu.2.items.0.description'),
            icon: Building,
            url: '/companies',
          },
          {
            title: tNav('menu.2.items.1.title'),
            description: tNav('menu.2.items.1.description'),
            icon: School,
            url: '/services/academic',
          },
          {
            title: tNav('menu.2.items.2.title'),
            description: tNav('menu.2.items.2.description'),
            icon: UserRoundSearch,
            url: '/services/concierge-service',
          },
          {
            title: tNav('menu.2.items.3.title'),
            description: tNav('menu.2.items.3.description'),
            icon: Backpack,
            url: '/services/discover-geneva',
          },
          {
            title: tNav('menu.2.items.4.title'),
            description: tNav('menu.2.items.4.description'),
            icon: House,
            url: '/properties',
          },
        ],
      },
    ],
    contactButton: {
      text: tNav('contactButton.text'),
      url: '/contact',
    },
    callButton: {
      text: tNav('callButton.text'),
      url: '/call-me-back',
    },
  };

  return (
    <NavbarContainer
      menu={navLinks.menu}
      callButton={navLinks.callButton}
      contactButton={navLinks.contactButton}
      locale={locale}
    />
  );
};

export { Navbar };
