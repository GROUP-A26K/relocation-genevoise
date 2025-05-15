import { Env } from '@/libs/Env';
import { fetchBlogs } from '@/services/blog.service';
import { AppConfig } from '@/utils/AppConfig';
const domainURL = Env.NEXT_PUBLIC_SITE_URL;
const PageNumber = 1;
const PageSize = 100;
export async function GET() {
  try {
    // Fetch categories data from Sanity
    const data = await fetchBlogs({
      page: PageNumber,
      pageSize: PageSize,
      filterBy: '',
      locale: 'fr',
      search: '',
    });

    const localizedRoutes = AppConfig.locales.flatMap((locale) =>
      data.blogs.map((route) => ({
        url: `${domainURL}/${locale}/${route.slug.replace(/^[a-z]{2}-/i, '')}`,
        lastModified: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      }))
    );

    // Generate the sitemap XML structure
    const sitemapData = [
      {
        url: `${domainURL}/blog`,
        lastModified: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      },
      ...localizedRoutes,
    ];

    // Create the XML response
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemapData
          .map(
            (item) => `
          <url>
            <loc>${item.url}</loc>
            <lastmod>${item.lastModified}</lastmod>
            <changefreq>${item.changefreq}</changefreq>
            <priority>${item.priority}</priority>
          </url>`
          )
          .join('')}
      </urlset>`,
      {
        headers: {
          'Content-Type': 'application/xml',
        },
      }
    );
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
