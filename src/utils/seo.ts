import { Env } from '@/libs/Env';
import { AppConfig } from '@/utils/AppConfig';
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
