import 'server-only';

import { toUrlSlug } from '@/utils/slug';
import { AppConfig } from '@/utils/appConfig';
import { sanityFetch } from '@/sanity/lib/fetch';
import { SITEMAP_DOCUMENTS_QUERY } from '@/sanity/lib/queries';
import { getAlternates, type TSitemapUrl } from '@/utils/sitemap';
import {
  getAbsoluteUrl,
  getLocalizedPath,
  toHref,
  toIsoDate,
} from '@/utils/seo';

import type { TPathname, TSitemapPathname } from '@/utils/appConfig';

type TCmsSitemapSource = {
  type: string;
  pathname: TPathname;
  tag: string;
  priority: number;
  requiresExplicitVisibility: boolean;
};

const CMS_SITEMAPS = {
  blog: {
    type: 'relocationBlogPost',
    pathname: '/blog/[slug]',
    tag: 'sitemap-blogs',
    priority: 0.7,
    requiresExplicitVisibility: false,
  },
  properties: {
    type: 'property',
    pathname: '/properties/[slug]',
    tag: 'sitemap-properties',
    priority: 0.6,
    requiresExplicitVisibility: false,
  },
  career: {
    type: 'relocationJobPost',
    pathname: '/career/[slug]',
    tag: 'jobs',
    priority: 0.6,
    requiresExplicitVisibility: true,
  },
} as const satisfies Record<string, TCmsSitemapSource>;

export type TCmsSitemap = keyof typeof CMS_SITEMAPS;

export const CMS_SITEMAP_NAMES = Object.keys(CMS_SITEMAPS) as TCmsSitemap[];

const STATIC_LAST_MODIFIED = new Date().toISOString();

export const getStaticSitemapUrls = (): TSitemapUrl[] =>
  (Object.keys(AppConfig.sitemapPriorities) as TSitemapPathname[]).flatMap(
    (pathname) => {
      const pathByLocale = Object.fromEntries(
        AppConfig.locales.map((locale): [string, string] => [
          locale,
          getLocalizedPath(locale, toHref(pathname)),
        ])
      );
      const alternates = getAlternates(pathByLocale);

      return AppConfig.locales.map((locale) => ({
        loc: getAbsoluteUrl(pathByLocale[locale]),
        lastModified: STATIC_LAST_MODIFIED,
        priority: AppConfig.sitemapPriorities[pathname],
        alternates,
      }));
    }
  );

export const getCmsSitemapUrls = async (
  name: TCmsSitemap
): Promise<TSitemapUrl[]> => {
  const { type, pathname, tag, priority, requiresExplicitVisibility } =
    CMS_SITEMAPS[name];

  const documents = await sanityFetch(
    SITEMAP_DOCUMENTS_QUERY,
    { type, locales: AppConfig.locales, requiresExplicitVisibility },
    { tags: [tag] }
  );

  const toPath = (locale: string, slug: string) =>
    getLocalizedPath(locale, toHref(pathname, toUrlSlug(slug)));

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
