// app/api/sitemap/blog-category/route.ts
import { POST_CATEGORIES_QUERY } from '@/sanity/lib/queries';
import type { BlogCategory } from '@/sanity/types';
import { client } from '@/sanity/lib/client';
import { Env } from '@/libs/Env';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const CFG = {
  BASE_URL: Env.NEXT_PUBLIC_SITE_URL,
  MAIN: {
    path: '/blog-category',
    changefreq: 'weekly',
    priority: 0.8,
  },
  SUB: {
    changefreq: 'weekly',
    priority: 0.7,
  },
  FETCH_LIMIT: 10,
} as const;

type ChangeFreq = typeof CFG.MAIN.changefreq;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface SitemapEntry {
  url: string;
  lastModified: string;
  changefreq: ChangeFreq;
  priority: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const NOW = new Date().toISOString();

const buildEntries = async (): Promise<SitemapEntry[]> => {
  const categories = await client.fetch<BlogCategory[]>(
    POST_CATEGORIES_QUERY,
    { limit: CFG.FETCH_LIMIT }
  );

  const mainEntry: SitemapEntry = {
    url: `${CFG.BASE_URL}${CFG.MAIN.path}`,
    lastModified: NOW,
    changefreq: CFG.MAIN.changefreq,
    priority: CFG.MAIN.priority,
  };

  const subEntries: SitemapEntry[] = categories.map(({ name, _updatedAt }) => ({
    url: `${CFG.BASE_URL}${CFG.MAIN.path}/${name.toLowerCase()}`,
    lastModified: _updatedAt,
    changefreq: CFG.SUB.changefreq,
    priority: CFG.SUB.priority,
  }));

  return [mainEntry, ...subEntries];
};

const toXml = (entries: SitemapEntry[]): string => `<?xml version="1.0" encoding="UTF-8"?>
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
/* Route handler                                                       */
/* ------------------------------------------------------------------ */

export async function GET(): Promise<Response> {
  try {
    const xml = toXml(await buildEntries());

    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (err) {
    console.error('[sitemap:blog-category] generation failed:', err);
    return new Response('Internal server error while generating sitemap', {
      status: 500,
    });
  }
}
