import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Link } from "@/libs/i18nNavigation";
import Section from "@/components/customs/Section";
import AgLogo from "@/assets/img/logos/rg-logo.svg";
import Facebook from "@/assets/img/logos/social/facebook.svg";
import Linkedin from "@/assets/img/logos/social/linkedin.svg";
import Instagram from "@/assets/img/logos/social/instagram.svg";
import { GoogleRating } from "@/components/blocks/GoogleRating";

import { SubscribeForm } from "./SubscribeForm";
import GGLogo from "@/components/icons/GGLogo";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
    icon?: string;
  }[];
}

interface Props {
  contact: {
    title: string;
    subTitle: string;
    buttonText: string;
    inputPlaceholder: string;
  };
  logo: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };

  tagline: string;
  googleRating: {
    googleUrl: string;
    title: string;
    subTitle: string;
  };
  service: MenuItem;
  company: MenuItem;
  support: MenuItem;
  social: MenuItem;
  copyright: string;
  bottomLinks: {
    text: string;
    url: string;
  }[];
}

const Footer = async () => {
  const t = await getTranslations("Footer");

  const footerData: Props = {
    contact: {
      title: t("contact.title"),
      subTitle: t("contact.subTitle"),
      buttonText: t("contact.buttonText"),
      inputPlaceholder: t("contact.inputPlaceholder"),
    },
    logo: {
      title: t("logo.title"),
      src: AgLogo,
      alt: "blocks for shadcn/ui",
      url: "/",
    },
    tagline: t("tagline"),
    googleRating: {
      googleUrl: "https://g.co/kgs/2jZuSLz",
      title: t("googleRating.title"),
      subTitle: t("googleRating.subTitle"),
    },
    service: {
      title: t("service.title"),
      links: [
        { text: t("service.links.0.text"), url: "/find-accommodation" },
        {
          text: t("service.links.1.text"),
          url: "/find-a-tenant",
        },
        {
          text: t("service.links.2.text"),
          url: "/companies",
        },
      ],
    },
    company: {
      title: t("company.title"),
      links: [
        { text: t("company.links.0.text"), url: "/services/academic" },
        {
          text: t("company.links.1.text"),
          url: "/services/discover-geneva",
        },
        {
          text: t("company.links.2.text"),
          url: "/services/concierge-service",
        },
        {
          text: t("company.links.3.text"),
          url: "/properties",
        },
      ],
    },
    support: {
      title: t("support.title"),
      links: [
        { text: t("support.links.0.text"), url: "/contact" },
        { text: t("support.links.1.text"), url: "/faq" },
        { text: "Blog", url: "/blog" },
        { text: t("support.links.2.text"), url: "/career" },
      ],
    },
    social: {
      title: t("social.title"),
      links: [
        {
          icon: Facebook,
          text: "Facebook",
          url: "https://www.facebook.com/people/Relocation-Genevoise/61566756459931/",
        },
        {
          icon: Linkedin,
          text: t("social.links.0.text"),
          url: "https://www.linkedin.com/company/relocation-genevoise",
        },
        {
          icon: Instagram,
          text: "Instagram",
          url: "https://www.instagram.com/relocationgenevoise/",
        },
      ],
    },
    copyright: t("copyright"),
    bottomLinks: [
      { text: t("bottomLinks.0.text"), url: "/legal-notice" },
      { text: t("bottomLinks.1.text"), url: "/personal-data" },
      { text: t("bottomLinks.2.text"), url: "/sitemap" },
    ],
  };
  const {
    contact,
    logo,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start justify-between gap-y-4">
          <div className="flex flex-col gap-2 max-w-xl justify-start">
            <h3 className="text-lg font-semibold !leading-[130%]">
              {contact.title}
            </h3>
            <p className="text-xs font-normal text-black-200 !leading-[130%]">
              {contact.subTitle}
            </p>
          </div>
          <SubscribeForm />
        </div>
      </Section>

      <Section>
        <div className="flex flex-col lg:flex-row lg:gap-16 gap-0">
          <div className="flex flex-col lg:max-w-[336px] w-full mb-8 lg:mb-0 gap-6">
            <div className="flex items-center lg:justify-start">
              <Link href={logo.url}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="h-8 w-[83px]"
                />
              </Link>
            </div>
            <p className="text-sm text-black-200 !leading-[130%]">{tagline}</p>
            <GoogleRating
              googleUrl={googleRating.googleUrl}
              point={5}
              title={googleRating.title}
              subTitle={googleRating.subTitle}
            />
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-2 text-sm w-full lg:gap-0 gap-8">
            <div className="lg:grid lg:grid-cols-2 lg:col-span-2 lg:gap-0 flex flex-col w-full gap-8">
              <div>
                <ul role="list" className="space-y-3">
                  {service.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary flex items-center gap-1.5 !leading-[130%]"
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
                <ul role="list" className="space-y-3">
                  {company.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary flex items-center gap-1.5 !leading-[130%]"
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
            <div className="lg:grid lg:grid-cols-2 lg:col-span-2 lg:gap-0 flex flex-col w-full gap-8">
              <div>
                <ul role="list" className="space-y-3">
                  {support.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary flex items-center gap-1.5 !leading-[130%]"
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
                <ul
                  role="list"
                  className="lg:space-y-3 flex lg:flex-col flex-col lg:gap-0 gap-3"
                >
                  {social.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary flex items-center gap-1.5 !leading-[130%]"
                      >
                        {link?.icon && (
                          <Image
                            src={link.icon}
                            alt={"Linkedin logo"}
                            title="Linkedin logo"
                            width={12}
                            height={12}
                            className="flex lg:h-3 lg:w-3 h-6 w-6"
                          />
                        )}

                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <section className="relative flex flex-col justify-center items-center bg-grey-50 text-black-500">
        <div
          className={`container py-8 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  xl:px-[100px] lg:px-[48px] px-4`}
        >
          <Link
            href="https://groupe-genevoise.ch/"
            target="_blank"
            className="flex items-center w-fit"
          >
            <GGLogo className="mb-4" />
          </Link>

          <div className="flex w-full flex-col justify-between gap-4 text-xs font-normal !leading-[130%] text-black-300 md:flex-row md:items-center">
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
