import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';

import { routing } from './i18nNavigation';

export default getRequestConfig(
  async ({ locale: explicitLocale, requestLocale }) => {
    const requestedLocale = explicitLocale ?? (await requestLocale);
    const locale = hasLocale(routing.locales, requestedLocale)
      ? requestedLocale
      : routing.defaultLocale;
    const messagesModule = (await import(`../locales/${locale}.json`)) as {
      default: Record<string, unknown>;
    };

    return {
      locale,
      messages: messagesModule.default,
    };
  }
);
