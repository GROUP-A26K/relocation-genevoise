import 'server-only';

import { AppConfig } from '@/utils/appConfig';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SITEMAP_DOCUMENTS_QUERY } from '@/sanity/lib/queries';
import { getAlternates, type TSitemapUrl } from '@/utils/sitemap';
import {
  getAbsoluteUrl,
  getLocalizedPath,
  stripLocalePrefix,
  toIsoDate,
  type TRouteKey,
} from '@/utils/seo';

type TCmsSitemapSource = {
  type: string;
  routeKey: TRouteKey;
  tag: string;
  priority: number;
  requiresExplicitVisibility: boolean;
};

const CMS_SITEMAPS = {
  blog: {
    type: 'relocationBlogPost',
    routeKey: 'blog',
    tag: 'sitemap-blogs',
    priority: 0.7,
    requiresExplicitVisibility: false,
  },
  properties: {
    type: 'property',
    routeKey: 'properties',
    tag: 'sitemap-properties',
    priority: 0.6,
    requiresExplicitVisibility: false,
  },
  career: {
    type: 'relocationJobPost',
    routeKey: 'career',
    tag: 'jobs',
    priority: 0.6,
    requiresExplicitVisibility: true,
  },
} as const satisfies Record<string, TCmsSitemapSource>;

export type TCmsSitemap = keyof typeof CMS_SITEMAPS;

export const CMS_SITEMAP_NAMES = Object.keys(CMS_SITEMAPS) as TCmsSitemap[];

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
  const { type, routeKey, tag, priority, requiresExplicitVisibility } =
    CMS_SITEMAPS[name];

  const documents = await sanityFetch(
    SITEMAP_DOCUMENTS_QUERY,
    { type, locales: AppConfig.locales, requiresExplicitVisibility },
    { tags: [tag] }
  );

  const toPath = (locale: string, slug: string) =>
    getLocalizedPath(locale, routeKey, stripLocalePrefix(slug));

  return documents.flatMap(({ _updatedAt, language, slug, translations }) => {
    if (!language || !slug) {
      return [];
    }

    const pathByLocale = Object.fromEntries([
      [language, toPath(language, slug)],
      ...(translations ?? []).flatMap((translation): [string, string][] =>
        translation?.language &&
        translation.slug &&
        (requiresExplicitVisibility
          ? translation.isHidden === false
          : translation.isHidden !== true)
          ? [
              [
                translation.language,
                toPath(translation.language, translation.slug),
              ],
            ]
          : []
      ),
    ]);

    return [
      {
        loc: getAbsoluteUrl(toPath(language, slug)),
        lastModified: toIsoDate(_updatedAt),
        priority,
        alternates: getAlternates(pathByLocale),
      },
    ];
  });
};
