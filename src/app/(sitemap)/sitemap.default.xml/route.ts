import { Env } from '@/libs/Env';
import { AppConfig } from '@/utils/AppConfig';

const domainURL = Env.NEXT_PUBLIC_SITE_URL;

// Define your static routes with their URL patterns
const staticRoutes = [
  { url: `assistance` },
  { url: `blog` },
  { url: `contact` },
  { url: `donnes-personnelles` },
  { url: `mentions-legales` },
  { url: `particulier` },
  { url: `professionnel` },
  { url: `rappelez-moi` },
  { url: `sitemap` },
];

export async function GET() {
  try {
    // Build the sitemap data with the homepage entry and your static routes
    const localizedRoutes = AppConfig.locales.flatMap((locale) =>
      staticRoutes.map((route) => ({
        url: `${domainURL}/${locale}/${route.url}`,
        lastModified: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 0.5,
      }))
    );

    // You might also want to include a non-localized homepage entry if it exists
    const sitemapData = [
      {
        url: `${domainURL}`,
        lastModified: new Date().toISOString(),
        changefreq: 'weekly',
        priority: 1.0,
      },
      ...localizedRoutes,
    ];
    // Construct the XML sitemap string
    const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
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
</urlset>`;

    return new Response(sitemapXML, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
