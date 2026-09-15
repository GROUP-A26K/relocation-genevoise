import { Env } from '@/libs/env';
import { AppConfig } from '@/utils/appConfig';
import { LANGUAGE_TAGS, OG_LOCALES } from '@/constants/seo';

import type { TLocale } from '@/constants/locale';

export type TRouteKey = keyof typeof AppConfig.routes;

type TSchemaNode = 'organization' | 'website';

const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

const toLocale = (locale: string): TLocale =>
  (AppConfig.locales.includes(locale)
    ? locale
    : AppConfig.defaultLocale) as TLocale;

export const getSiteUrl = () => Env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, '');

export const getAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${getSiteUrl()}${path.startsWith('/') ? path : `/${path}`}`;
};

export const getSchemaId = (node: TSchemaNode) => `${getSiteUrl()}/#${node}`;

export const getLocalizedPath = (
  locale: string,
  routeKey: TRouteKey,
  slug?: string
) => {
  const currentLocale = toLocale(locale);
  const route = AppConfig.routes[routeKey][currentLocale];
  const prefix =
    currentLocale === AppConfig.defaultLocale ? '' : `/${currentLocale}`;
  const pathname = `${prefix}${route === '/' ? '' : route}${slug ? `/${slug}` : ''}`;

  return pathname || '/';
};

export const stripLocalePrefix = (slug: string) =>
  slug.replace(/^[a-z]{2}-/i, '');

export const getHreflangPaths = (
  pathByLocale: Partial<Record<string, string>>
): Record<string, string> => {
  const entries = AppConfig.locales.flatMap((locale): [string, string][] => {
    const path = pathByLocale[locale];

    return path ? [[locale, path]] : [];
  });

  if (entries.length < 2) {
    return {};
  }

  const defaultPath = pathByLocale[AppConfig.defaultLocale];

  return Object.fromEntries(
    defaultPath ? [...entries, ['x-default', defaultPath]] : entries
  );
};

export const getPageAlternates = (
  locale: string,
  routeKey: TRouteKey,
  slugByLocale?: Partial<Record<string, string>>
) => {
  const pathByLocale = Object.fromEntries(
    AppConfig.locales.flatMap((currentLocale): [string, string][] => {
      if (!slugByLocale) {
        return [[currentLocale, getLocalizedPath(currentLocale, routeKey)]];
      }

      const slug = slugByLocale[currentLocale];

      return slug
        ? [
            [
              currentLocale,
              getLocalizedPath(
                currentLocale,
                routeKey,
                stripLocalePrefix(slug)
              ),
            ],
          ]
        : [];
    })
  );

  return {
    canonical: pathByLocale[locale],
    languages: getHreflangPaths(pathByLocale),
  };
};

export const getSlugByLocale = (
  locale: string,
  slug: string,
  translations: { locale: string; slug: string }[]
) => ({
  ...Object.fromEntries(
    translations.map((translation) => [translation.locale, translation.slug])
  ),
  [locale]: slug,
});

export const getOgLocale = (locale: string) => OG_LOCALES[toLocale(locale)];

export const getLanguageTag = (locale: string) =>
  LANGUAGE_TAGS[toLocale(locale)];

export const toIsoDate = (value?: string | null) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return DATE_ONLY_PATTERN.test(value) ? value : date.toISOString();
};

export const toPlainText = (text: string) =>
  text
    .replace(/\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g, '$1')
    .replace(/\(\((.*?)\)\)/g, '$1')
    .replace(/\*{1,2}/g, '')
    .replace(/\s+/g, ' ')
    .trim();
