import { AppConfig } from "@/utils/AppConfig";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/libs/i18n.ts");

type LocaleMap = Record<string, string>;

function buildRewrites() {
  const { defaultLocale, locales, routes } = AppConfig;

  return Object.values(routes).flatMap((localeMap: LocaleMap) => {
    const canonical = localeMap[defaultLocale];

    return locales.map((locale) => ({
      source: `/${locale}${localeMap[locale]}`,
      destination: `/${locale}${canonical}`,
    }));
  });
}

function buildRedirects() {
  const { defaultLocale, routes } = AppConfig;
  const en = "en";

  return Object.values(routes).map((localeMap: LocaleMap) => {
    const canonical = localeMap[defaultLocale];
    return {
      source: `/${en}${canonical}`,
      destination: `/${en}${localeMap[en]}`,
      permanent: true,
    };
  });
}

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.sanity.io"],
  },

  async rewrites() {
    return buildRewrites();
  },

  async redirects() {
    return buildRedirects();
  },
};

export default withNextIntl(nextConfig);
