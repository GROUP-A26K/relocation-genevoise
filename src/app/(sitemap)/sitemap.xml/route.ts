// app/api/sitemap-index/route.ts
import { Env } from '@/libs/Env';

const { NEXT_PUBLIC_SITE_URL: SITE_URL } = Env;

/* ------------------------------------------------------------------ */
/* Config: list the sitemap files here                                */
/* ------------------------------------------------------------------ */

const SITEMAP_FILES = [
  'sitemap.blog.xml',
  'sitemap.default.xml',
  'sitemap.blog-category.xml',
] as const;

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

type SitemapFile = (typeof SITEMAP_FILES)[number];

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */

const LAST_MOD = new Date().toISOString();

const buildSitemapTag = (file: SitemapFile): string => `
  <sitemap>
    <loc>${SITE_URL}/${file}</loc>
    <lastmod>${LAST_MOD}</lastmod>
  </sitemap>`;

/* ------------------------------------------------------------------ */
/* Route handler                                                      */
/* ------------------------------------------------------------------ */

export async function GET(): Promise<Response> {
  try {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                      http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
${SITEMAP_FILES.map(buildSitemapTag).join('\n')}
</sitemapindex>`;

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (err) {
    console.error('[sitemap-index] generation failed:', err);
    return new Response('Error generating sitemap index', { status: 500 });
  }
}
