import { getAbsoluteUrl } from '@/utils/seo';
import { AppConfig } from '@/utils/AppConfig';

export type TSitemapAlternate = {
  hreflang: string;
  href: string;
};

export type TSitemapUrl = {
  loc: string;
  lastModified?: string;
  priority?: number;
  alternates?: TSitemapAlternate[];
};

export type TSitemapIndexEntry = {
  loc: string;
  lastModified?: string;
};

const XML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;',
};

const escapeXml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => XML_ENTITIES[char] ?? char);

const toTag = (name: string, value?: number | string) =>
  value === undefined
    ? ''
    : `\n    <${name}>${escapeXml(String(value))}</${name}>`;

export const getAlternates = (
  pathByLocale: Partial<Record<string, string>>
): TSitemapAlternate[] => {
  const alternates = AppConfig.locales.flatMap((locale) => {
    const path = pathByLocale[locale];

    return path ? [{ hreflang: locale, href: getAbsoluteUrl(path) }] : [];
  });

  if (alternates.length < 2) {
    return [];
  }

  const defaultPath = pathByLocale[AppConfig.defaultLocale];

  return defaultPath
    ? [
        ...alternates,
        { hreflang: 'x-default', href: getAbsoluteUrl(defaultPath) },
      ]
    : alternates;
};

export const getLatestModified = (urls: TSitemapUrl[]) =>
  urls.reduce<string | undefined>(
    (latest, { lastModified }) =>
      lastModified && (!latest || lastModified > latest)
        ? lastModified
        : latest,
    undefined
  );

export const buildUrlsetXml = (urls: TSitemapUrl[]) => {
  const body = urls
    .map(({ loc, lastModified, priority, alternates = [] }) => {
      const links = alternates
        .map(
          ({ hreflang, href }) =>
            `\n    <xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}"/>`
        )
        .join('');

      return `  <url>\n    <loc>${escapeXml(loc)}</loc>${toTag('lastmod', lastModified)}${toTag('priority', priority)}${links}\n  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${body}\n</urlset>`;
};

export const buildSitemapIndexXml = (entries: TSitemapIndexEntry[]) => {
  const body = entries
    .map(
      ({ loc, lastModified }) =>
        `  <sitemap>\n    <loc>${escapeXml(loc)}</loc>${toTag('lastmod', lastModified)}\n  </sitemap>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>`;
};

export const createXmlResponse = (xml: string) =>
  new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });

export const createUrlsetResponse = async (
  name: string,
  getUrls: () => Promise<TSitemapUrl[]> | TSitemapUrl[]
) => {
  try {
    const urls = await getUrls();

    if (!urls.length) {
      return new Response('Sitemap has no entries', { status: 404 });
    }

    return createXmlResponse(buildUrlsetXml(urls));
  } catch (error) {
    console.error(`[sitemap:${name}] generation failed:`, error);

    return new Response('Error generating sitemap', { status: 500 });
  }
};
