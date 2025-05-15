import {
  Building,
  Earth,
  Scale,
  ShieldHalf,
  Heart,
  House,
  LifeBuoy,
} from 'lucide-react';
import { FC } from 'react';
import { NavbarContainer, NavbarProps } from './NavbarContainer';
import { getTranslations } from 'next-intl/server';

const Navbar: FC<{ locale: string }> = async ({ locale }) => {
  const tNav = await getTranslations({
    locale,
    namespace: 'Navbar',
  });
  const navLinks: NavbarProps = {
    menu: [
      {
        title: tNav('menu.0.title'),
        url: '#',
        items: [
          {
            title: tNav('menu.0.items.0.title'),
            description: tNav('menu.0.items.0.description'),
            icon: Building,
            url: '/professionnel/entreprise',
          },
          {
            title: tNav('menu.0.items.1.title'),
            description: tNav('menu.0.items.1.description'),
            icon: Earth,
            url: '/professionnel/international',
          },
          {
            title: tNav('menu.0.items.2.title'),
            description: tNav('menu.0.items.2.description'),
            icon: ShieldHalf,
            url: '/professionnel/profession-liberale',
          },
        ],
      },
      {
        title: tNav('menu.1.title'),
        url: '#',
        items: [
          {
            title: tNav('menu.1.items.0.title'),
            description: tNav('menu.1.items.0.description'),
            icon: Building,
            url: '/particulier/assurance',
          },
          {
            title: tNav('menu.1.items.1.title'),
            description: tNav('menu.1.items.1.description'),
            icon: Earth,
            url: '/particulier/assurance/assurance-frontalier',
          },
          {
            title: tNav('menu.1.items.2.title'),
            description: tNav('menu.1.items.2.description'),
            icon: Scale,
            url: '/particulier/taxes-et-fiscalite',
          },
          {
            title: tNav('menu.1.items.3.title'),
            description: tNav('menu.1.items.3.description'),
            icon: Heart,
            url: '/particulier/sante',
          },
          {
            title: tNav('menu.1.items.4.title'),
            description: tNav('menu.1.items.4.description'),
            icon: House,
            url: '/particulier/hypotheque',
          },
          {
            title: tNav('menu.1.items.5.title'),
            description: tNav('menu.1.items.5.description'),
            icon: LifeBuoy,
            url: '/particulier/prevoyance',
          },
        ],
      },
      {
        title: tNav('menu.2.title'),
        url: '/blog',
      },
      {
        title: tNav('menu.3.title'),
        url: '/contact',
      },
    ],
    callButton: {
      text: tNav('callButton.text'),
      url: '/rappelez-moi',
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
