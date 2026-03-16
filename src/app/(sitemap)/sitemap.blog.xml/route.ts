// app/api/sitemap/blog/route.ts
import { Env } from '@/libs/Env';
import { fetchBlogs } from '@/services/blog.service';
import { AppConfig } from '@/utils/AppConfig';

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

const { NEXT_PUBLIC_SITE_URL: SITE_URL } = Env;

const PAGE_NUMBER = 1;
const PAGE_SIZE = 100;
const CHANGE_FREQ = 'weekly' as const;

type ChangeFreq = typeof CHANGE_FREQ;

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Blog {
  slug: string;
}

interface SitemapEntry {
  url: string;
  lastModified: string;
  changefreq: ChangeFreq;
  priority: number;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const now = new Date().toISOString();

const normalizeSlug = (slug: string): string => slug.replace(/^[a-z]{2}-/i, '');

const buildBlogEntries = (blogs: Blog[], locale: string): SitemapEntry[] =>
  blogs.map(({ slug }) => ({
    url: `${SITE_URL}/${locale}/blog/${normalizeSlug(slug)}`,
    lastModified: now,
    changefreq: CHANGE_FREQ,
    priority: 0.7,
  }));

const buildXml = (
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
/* Route handler                                                       */
/* ------------------------------------------------------------------ */

export async function GET(): Promise<Response> {
  try {
    /* ---- Fetch blogs per locale ---------------------------------- */
    const localizedEntries = await Promise.all(
      AppConfig.locales.map(async (locale) => {
        const { blogs } = await fetchBlogs({
          page: PAGE_NUMBER,
          pageSize: PAGE_SIZE,
          filterBy: '',
          locale,
          search: '',
        });

        return buildBlogEntries(blogs, locale);
      })
    );
    const blogEntries = localizedEntries.flat();

    /* ---- Build sitemap entries ----------------------------------- */
    const entries: SitemapEntry[] = [
      {
        url: `${SITE_URL}/blog`,
        lastModified: now,
        changefreq: CHANGE_FREQ,
        priority: 0.8,
      },
      ...blogEntries,
    ];

    /* ---- Send response ------------------------------------------- */
    return new Response(buildXml(entries), {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
      },
    });
  } catch (err) {
    console.error('[sitemap:blog] generation failed:', err);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
