import { AppConfig } from '@/utils/appConfig';

const CMS_LOCALE_PREFIX = new RegExp(`^(?:${AppConfig.locales.join('|')})-`);

export const toUrlSlug = (cmsSlug: string) =>
  cmsSlug.replace(CMS_LOCALE_PREFIX, '');

export const toCmsSlug = (urlSlug: string, locale: string) =>
  `${locale}-${urlSlug}`;
