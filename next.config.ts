import { AppConfig } from "@/utils/AppConfig";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";
import sentryWebpackPluginOptions from "./sentry.config";
const withNextIntl = createNextIntlPlugin("./src/libs/i18n.ts");

type LocaleMap = Record<string, string | number>;

function buildRewrites() {
  const { locales, routes } = AppConfig;
  const en = "en";

  return Object.values(routes).flatMap((localeMap: LocaleMap) => {
    return locales.map((locale) => ({
      source: `/${locale}${localeMap[locale]}`,
      destination: `/${locale}${localeMap[en]}`,
    }));
  });
}

function buildRedirects() {
  const { defaultLocale, routes, locales } = AppConfig;
  const en = "en";

  return Object.values(routes).flatMap((localeMap: LocaleMap) => {
    if (localeMap[en] === localeMap[defaultLocale]) {
      return [];
    }

    return locales.map((locale) => {
      if (locale === defaultLocale) {
        return {
          source: `${localeMap[en]}`,
          destination: `/${defaultLocale}${localeMap[defaultLocale]}`,
          permanent: true,
        };
      }
      return {
        source: `/${en}${localeMap[defaultLocale]}`,
        destination: `/${en}${localeMap[en]}`,
        permanent: true,
      };
    });
  });
}

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.sanity.io", "randomuser.me"],
  },
  productionBrowserSourceMaps: true,
  sentry: {
    hideSourceMaps: true,
    widenClientFileUpload: true,
  },
  async rewrites() {
    return [
      {
        source: "/fr/carriere/:slug*",
        destination: "/fr/career/:slug*",
      },
      ...buildRewrites(),
    ];
  },

  async redirects() {
    return [
      {
        source: "/en/carriere/:slug*",
        destination: "/en/career/:slug*",
        permanent: true,
      },
      {
        source: "/career/:slug*",
        destination: "/carriere/:slug*",
        permanent: true,
      },
      ...buildRedirects(),
    ];
  },
};

export default withSentryConfig(
  withNextIntl(nextConfig),
  sentryWebpackPluginOptions
);
