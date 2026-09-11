import 'server-only';

import { AppConfig } from '@/utils/AppConfig';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SITEMAP_DOCUMENTS_QUERY } from '@/sanity/lib/queries';
import { getAlternates, type TSitemapUrl } from '@/utils/sitemap';
import {
  getAbsoluteUrl,
  getLocalizedPath,
  toIsoDate,
  type TRouteKey,
} from '@/utils/seo';

type TSitemapTranslation = {
  language?: string;
  slug?: string;
  isHidden?: boolean | null;
} | null;

type TSitemapDocument = {
  _updatedAt: string;
  language: string;
  slug: string;
  translations: TSitemapTranslation[] | null;
};

type TCmsSitemapSource = {
  type: string;
  routeKey: TRouteKey;
  tag: string;
  priority: number;
};

const CMS_SITEMAPS = {
  blog: {
    type: 'relocationBlogPost',
    routeKey: 'blog',
    tag: 'sitemap-blogs',
    priority: 0.7,
  },
  properties: {
    type: 'property',
    routeKey: 'properties',
    tag: 'sitemap-properties',
    priority: 0.6,
  },
  career: {
    type: 'relocationJobPost',
    routeKey: 'career',
    tag: 'jobs',
    priority: 0.6,
  },
} as const satisfies Record<string, TCmsSitemapSource>;

export type TCmsSitemap = keyof typeof CMS_SITEMAPS;

export const CMS_SITEMAP_NAMES = Object.keys(CMS_SITEMAPS) as TCmsSitemap[];

const stripLocalePrefix = (slug: string) => slug.replace(/^[a-z]{2}-/i, '');

export const getStaticSitemapUrls = (): TSitemapUrl[] =>
  (Object.keys(AppConfig.routes) as TRouteKey[]).flatMap((routeKey) => {
    const pathByLocale = Object.fromEntries(
      AppConfig.locales.map((locale): [string, string] => [
        locale,
        getLocalizedPath(locale, routeKey),
      ])
    );
    const alternates = getAlternates(pathByLocale);

    return AppConfig.locales.map((locale) => ({
      loc: getAbsoluteUrl(pathByLocale[locale]),
      priority: AppConfig.routes[routeKey].priority,
      alternates,
    }));
  });

export const getCmsSitemapUrls = async (
  name: TCmsSitemap
): Promise<TSitemapUrl[]> => {
  const { type, routeKey, tag, priority } = CMS_SITEMAPS[name];

  const documents = await sanityFetch<TSitemapDocument[]>(
    SITEMAP_DOCUMENTS_QUERY,
    { type, locales: AppConfig.locales },
    { tags: [tag] }
  );

  const toPath = (locale: string, slug: string) =>
    getLocalizedPath(locale, routeKey, stripLocalePrefix(slug));

  return documents.map(({ _updatedAt, language, slug, translations }) => {
    const pathByLocale = Object.fromEntries([
      [language, toPath(language, slug)],
      ...(translations ?? []).flatMap((translation): [string, string][] =>
        translation?.language && translation.slug && !translation.isHidden
          ? [
              [
                translation.language,
                toPath(translation.language, translation.slug),
              ],
            ]
          : []
      ),
    ]);

    return {
      loc: getAbsoluteUrl(toPath(language, slug)),
      lastModified: toIsoDate(_updatedAt),
      priority,
      alternates: getAlternates(pathByLocale),
    };
  });
};
