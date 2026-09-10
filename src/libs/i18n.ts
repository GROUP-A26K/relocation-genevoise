import { getRequestConfig } from 'next-intl/server';

import { routing } from './i18nNavigation';

import type { AbstractIntlMessages } from 'next-intl';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale)) {
    locale = routing.defaultLocale;
  }

  const { default: messages } = (await import(`../locales/${locale}.json`)) as {
    default: AbstractIntlMessages;
  };

  return { locale, messages };
});
