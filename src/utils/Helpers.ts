import { Env } from '@/libs/Env';
import { routing } from '@/libs/i18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_SITE_URL) {
    return Env.NEXT_PUBLIC_SITE_URL;
  }

  return 'http://localhost:3000';
};

export const getI18nPath = (url: string, locale: string) => {
  if (locale === routing.defaultLocale) {
    return url;
  }

  return `/${locale}${url}`;
};

export const formatDate = (dateString: string, locale: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', options);
};

export const getAlternatePath = (currentPath: string): string => {
  const { routes } = AppConfig;
  if (!currentPath.startsWith('/')) currentPath = `/${currentPath}`;

  const [, locale, ...rest] = currentPath.split('/');
  const slug = `/${rest.join('/')}` || '/';
  const otherLocale = locale === 'fr' ? 'en' : 'fr';

  const match = Object.values(routes).find(
    (entry) => entry[locale as 'fr' | 'en'] === slug
  );

  if (match) {
    return `/${otherLocale}${match[otherLocale]}`;
  }

  return `/${otherLocale}${slug}`;
};
