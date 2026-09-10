import { getTranslations } from 'next-intl/server';
import Image, { type StaticImageData } from 'next/image';

import { Link } from '@/libs/i18nNavigation';
import GGLogo from '@/components/icons/GGLogo';
import Section from '@/components/customs/Section';
import LogoIcon from '@/components/icons/LogoIcon';
import { RevealItem } from '@/components/customs/Reveal';
import Facebook from '@/assets/img/logos/social/facebook.svg';
import Linkedin from '@/assets/img/logos/social/linkedin.svg';
import Instagram from '@/assets/img/logos/social/instagram.svg';
import { GoogleRating } from '@/components/blocks/GoogleRating';

import { SubscribeForm } from './SubscribeForm';

type TMenuItem = {
  title: string;
  links: {
    text: string;
    url: string;
    icon?: string | StaticImageData;
  }[];
};

type TFooterData = {
  contact: {
    title: string;
    subTitle: string;
    buttonText: string;
    inputPlaceholder: string;
  };
  tagline: string;
  googleRating: {
    googleUrl: string;
    title: string;
    subTitle: string;
  };
  service: TMenuItem;
  company: TMenuItem;
  support: TMenuItem;
  social: TMenuItem;
  copyright: string;
  bottomLinks: {
    text: string;
    url: string;
  }[];
};

const Footer = async () => {
  const t = await getTranslations('Footer');

  const footerData: TFooterData = {
    contact: {
      title: t('contact.title'),
      subTitle: t('contact.subTitle'),
      buttonText: t('contact.buttonText'),
      inputPlaceholder: t('contact.inputPlaceholder'),
    },
    tagline: t('tagline'),
    googleRating: {
      googleUrl: 'https://g.co/kgs/2jZuSLz',
      title: t('googleRating.title'),
      subTitle: t('googleRating.subTitle'),
    },
    service: {
      title: t('service.title'),
      links: [
        { text: t('service.links.0.text'), url: '/find-accommodation' },
        {
          text: t('service.links.1.text'),
          url: '/find-a-tenant/landlords',
        },
        {
          text: t('service.links.2.text'),
          url: '/companies',
        },
      ],
    },
    company: {
      title: t('company.title'),
      links: [
        { text: t('company.links.0.text'), url: '/services/academic' },
        {
          text: t('company.links.1.text'),
          url: '/services/discover-geneva',
        },
        {
          text: t('company.links.2.text'),
          url: '/services/concierge-service',
        },
        {
          text: t('company.links.3.text'),
          url: '/properties',
        },
      ],
    },
    support: {
      title: t('support.title'),
      links: [
        { text: t('support.links.0.text'), url: '/contact' },
        { text: t('support.links.1.text'), url: '/faq' },
        { text: 'Blog', url: '/blog' },
        { text: t('support.links.2.text'), url: '/career' },
      ],
    },
    social: {
      title: t('social.title'),
      links: [
        {
          icon: Facebook,
          text: 'Facebook',
          url: 'https://www.facebook.com/people/Relocation-Genevoise/61566756459931/',
        },
        {
          icon: Linkedin,
          text: t('social.links.0.text'),
          url: 'https://www.linkedin.com/company/relocation-genevoise',
        },
        {
          icon: Instagram,
          text: 'Instagram',
          url: 'https://www.instagram.com/relocationgenevoise/',
        },
      ],
    },
    copyright: t('copyright'),
    bottomLinks: [
      { text: t('bottomLinks.0.text'), url: '/legal-notice' },
      { text: t('bottomLinks.1.text'), url: '/personal-data' },
      { text: t('bottomLinks.2.text'), url: '/sitemap' },
    ],
  };

  const {
    contact,
    tagline,
    googleRating,
    service,
    company,
    support,
    social,
    copyright,
    bottomLinks,
  } = footerData;

  return (
    <footer>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <Section isDivider>
        <RevealItem className="grid grid-cols-1 items-start justify-between gap-y-4 lg:grid-cols-2">
          <div className="flex max-w-xl flex-col justify-start gap-2">
            <h3 className="text-lg leading-[130%]! font-semibold">
              {contact.title}
            </h3>
            <p className="text-xs leading-[130%]! font-normal text-black-200">
              {contact.subTitle}
            </p>
          </div>
          <SubscribeForm />
        </RevealItem>
      </Section>

      <Section>
        <div className="flex flex-col gap-0 lg:flex-row lg:gap-16">
          <RevealItem className="mb-8 flex w-full flex-col gap-6 lg:mb-0 lg:max-w-84">
            <div className="flex items-center lg:justify-start">
              <Link href="/">
                <LogoIcon height={32} />
              </Link>
            </div>
            <p className="text-sm leading-[130%]! text-black-200">{tagline}</p>
            <GoogleRating
              googleUrl={googleRating.googleUrl}
              point={5}
              title={googleRating.title}
              subTitle={googleRating.subTitle}
            />
          </RevealItem>

          <RevealItem className="grid w-full grid-cols-2 gap-8 text-sm lg:grid-cols-4 lg:gap-0">
            <div className="flex w-full flex-col gap-8 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0">
              <div>
                <ul className="space-y-3">
                  {service.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="flex items-center gap-1.5 leading-[130%]! font-medium hover:text-primary"
                    >
                      {link?.icon && (
                        <Image
                          src={link.icon}
                          alt={link.text}
                          className="h-3 w-3"
                        />
                      )}
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  {company.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="flex items-center gap-1.5 leading-[130%]! font-medium hover:text-primary"
                    >
                      {link?.icon && (
                        <Image
                          src={link.icon}
                          alt={link.text}
                          className="h-3 w-3"
                        />
                      )}
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex w-full flex-col gap-8 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-0">
              <div>
                <ul className="space-y-3">
                  {support.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="flex items-center gap-1.5 leading-[130%]! font-medium hover:text-primary"
                    >
                      {link?.icon && (
                        <Image
                          src={link.icon}
                          alt={link.text}
                          className="h-3 w-3"
                        />
                      )}
                      <Link href={link.url}>{link.text}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-3 lg:flex-col lg:gap-0 lg:space-y-3">
                  {social.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 leading-[130%]! font-medium hover:text-primary"
                      >
                        {link?.icon && (
                          <Image
                            src={link.icon}
                            alt={link.text}
                            title={link.text}
                            width={12}
                            height={12}
                            className="flex size-3"
                          />
                        )}

                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </RevealItem>
        </div>
      </Section>

      <section className="relative flex flex-col items-center justify-center bg-grey-50 text-black-500">
        <div className="w-full px-4 py-8 lg:px-12 2xl:max-w-(--breakpoint-2xl) 2xl:px-25">
          <Link
            href="https://groupe-genevoise.ch/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-fit items-center"
          >
            <GGLogo className="mb-4" />
          </Link>

          <div className="flex w-full flex-col justify-between gap-4 text-xs leading-[130%]! font-normal text-black-300 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="hover:text-primary">
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
};

export { Footer };
