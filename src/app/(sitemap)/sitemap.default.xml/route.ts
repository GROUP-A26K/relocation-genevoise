import { Env } from '@/libs/Env';
import { AppConfig } from '@/utils/AppConfig';

const { NEXT_PUBLIC_SITE_URL: DOMAIN_URL } = Env;
const { routes, locales } = AppConfig;

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type ChangeFreq = 'weekly';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changefreq: ChangeFreq;
  priority: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const buildEntries = (): SitemapEntry[] => {
  const now = new Date().toISOString();

  // Localised pages
  const pages = Object.values(routes).flatMap(
    (localeMap: Record<string, string | number>) =>
      locales.map<SitemapEntry>((locale) => ({
        url: `${DOMAIN_URL}/${locale}${localeMap[locale]}`,
        lastModified: now,
        changefreq: 'weekly',
        priority: Number(localeMap.priority ?? 0.5), // default if absent
      }))
  );

  // Homepage
  pages.unshift({
    url: DOMAIN_URL,
    lastModified: now,
    changefreq: 'weekly',
    priority: 1.0,
  });

  return pages;
};

const toXml = (
  entries: SitemapEntry[]
): string => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    ({ url, lastModified, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

/* ------------------------------------------------------------------ */
/* Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function GET(): Promise<Response> {
  try {
    const xml = toXml(buildEntries());

    return new Response(xml, {
      headers: { 'Content-Type': 'application/xml' },
    });
  } catch (err) {
    console.error('[sitemap] generation failed:', err);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
