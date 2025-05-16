import { POST_CATEGORIES_QUERY } from '@/sanity/lib/queries';
import type { BlogCategory } from '@/sanity/types';
import { client } from '@/sanity/lib/client';
import { Env } from '@/libs/Env';

const domainURL = Env.NEXT_PUBLIC_SITE_URL;
export async function GET() {
  try {
    // Fetch categories data from Sanity
    const data = await client.fetch<BlogCategory[]>(POST_CATEGORIES_QUERY, {
      limit: 10,
    });

    // Generate the sitemap XML structure
    const sitemapData = [
      {
        url: `${domainURL}/blog-category`,
        lastModified: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.8,
      },
      ...data.map((item) => ({
        url: `${domainURL}/blog-category/${item.name}`,
        lastModified: item._updatedAt,
        changefreq: 'weekly',
        priority: 0.7,
      })),
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
