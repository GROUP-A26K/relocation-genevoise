import { Env } from '@/libs/Env';
const domainURL = Env.NEXT_PUBLIC_SITE_URL;
const generateSitemapLink = (url: string) =>
  `<sitemap>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    </sitemap>`;

export async function GET() {
  const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">
        ${generateSitemapLink(`${domainURL}/sitemap.blog.xml`)}
        ${generateSitemapLink(`${domainURL}/sitemap.default.xml`)}
        ${generateSitemapLink(`${domainURL}/sitemap.blog-category.xml`)}
    </sitemapindex>`;

  return new Response(sitemapIndexXML, {
    status: 200,
    headers: {
      'Cache-control': 'public, s-maxage=86400, stale-while-revalidate',
      'content-type': 'application/xml',
    },
  });
}
