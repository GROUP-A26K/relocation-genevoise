import { AppConfig } from '@/utils/AppConfig';
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/libs/i18n.ts');
function buildRewrites() {
  const { defaultLocale, routes, locales } = AppConfig;

  return Object.values(routes).flatMap((localeMap: Record<string, string>) => {
    const canonical = localeMap[defaultLocale as keyof typeof localeMap];

    return locales.map((locale) => {
      const source = `/${locale}${localeMap[locale]}`;
      const destination = `/${locale}${canonical}`;
      return { source, destination };
    });
  });
}

function buildRedirects() {
  const { defaultLocale, routes } = AppConfig;

  return Object.values(routes).flatMap((localeMap: Record<string, string>) => {
    const canonical = localeMap[defaultLocale as keyof typeof localeMap];
    const source = `/${'en'}${canonical}`;
    const destination = `/${'en'}${localeMap['en']}`;
    return { source, destination, permanent: true };
  });
}

const nextConfig: NextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },

  async rewrites() {
    return buildRewrites();
  },

  async redirects() {
    return buildRedirects();
  },
};

export default withNextIntl(nextConfig);
