import { Env } from '@/libs/env';

export const getBaseUrl = () => {
  if (Env.NEXT_PUBLIC_SITE_URL) {
    return Env.NEXT_PUBLIC_SITE_URL;
  }

  return 'http://localhost:3000';
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
