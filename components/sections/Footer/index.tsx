import Section from "@/components/customs/Section";
import Image from "next/image";
import AssociationLogo from "@/assets/img/logos/association-logo.png";
import { Link } from "@/libs/i18nNavigation";
import { FC } from "react";
import { SubscribeForm } from "./SubscribeForm";
import { getTranslations } from "next-intl/server";
import AgLogo from "@/assets/img/logos/rg-logo.svg";
import Linkedin from "@/assets/img/logos/social/linkedin.svg";
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

const Footer: FC<{ locale: string }> = async ({ locale }) => {
  const t = await getTranslations({
    locale,
    namespace: "Footer",
  });

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
    service: {
      title: t("service.title"),
      links: [
        { text: t("service.links.0.text"), url: "/professionnel/entreprise" },
        {
          text: t("service.links.1.text"),
          url: "/professionnel/international",
        },
        {
          text: t("service.links.2.text"),
          url: "/professionnel/profession-liberale",
        },
      ],
    },
    company: {
      title: t("company.title"),
      links: [
        { text: t("company.links.0.text"), url: "/particulier/assurance" },
        {
          text: t("company.links.1.text"),
          url: "/particulier/assurance/assurance-frontalier",
        },
        {
          text: t("company.links.2.text"),
          url: "/particulier/taxes-et-fiscalite",
        },
        { text: t("company.links.3.text"), url: "/particulier/sante" },
        { text: t("company.links.4.text"), url: "/particulier/hypotheque" },
        { text: t("company.links.5.text"), url: "/particulier/prevoyance" },
      ],
    },
    support: {
      title: t("support.title"),
      links: [
        { text: t("support.links.0.text"), url: "/rappelez-moi" },
        { text: t("support.links.1.text"), url: "/assistance" },
        { text: t("support.links.2.text"), url: "#" },
        { text: t("support.links.3.text"), url: "/contact" },
        { text: t("support.links.4.text"), url: "/assistance" },
        { text: t("support.links.5.text"), url: "/blog" },
      ],
    },

    social: {
      title: t("social.title"),
      links: [
        {
          icon: Linkedin,
          text: t("social.links.0.text"),
          url: "https://www.linkedin.com/company/assurance-genevoise",
        },
      ],
    },
    copyright: t("copyright"),
    bottomLinks: [
      { text: t("bottomLinks.0.text"), url: "/mentions-legales" },
      { text: t("bottomLinks.1.text"), url: "/donnes-personnelles" },
      { text: t("bottomLinks.2.text"), url: "/sitemap" },
    ],
  };
  const {
    contact,
    logo,
    tagline,
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
          <div className="flex flex-col max-w-[336px] mb-8 lg:mb-0 gap-6">
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
            <Image
              src={AssociationLogo}
              alt="Association logo"
              title="Association logo"
              width={144}
              height={60}
            />
          </div>

          <div className="grid lg:grid-cols-4 grid-cols-2 text-sm w-full lg:gap-0 gap-8">
            <div className="lg:grid lg:grid-cols-2 lg:col-span-2 lg:gap-0 flex flex-col w-full gap-8">
              <div>
                <h3 className="mb-3 text-xs text-black-500 !leading-[130%]">
                  {service.title}
                </h3>
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
                <h3 className="mb-3 text-xs text-black-500 !leading-[130%]">
                  {company.title}
                </h3>
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
                <h3 className="mb-3 text-xs text-black-500 !leading-[130%]">
                  {support.title}
                </h3>
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
                <h3 className="mb-3 text-xs text-black-500 !leading-[130%]">
                  {social.title}
                </h3>
                <ul
                  role="list"
                  className="lg:space-y-3 flex lg:flex-col flex-row lg:gap-0 gap-3"
                >
                  {social.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.url}
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
          className={`container lg:py-8 py-14 2xl:max-w-screen-2xl xl:max-w-screen-xl lg:max-w-screen-xl md:max-w-screen-md  xl:px-[100px] lg:px-[48px] px-4`}
        >
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
