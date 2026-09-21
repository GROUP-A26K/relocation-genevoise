import { getAbsoluteUrl } from '@/utils/seo';
import { buildSitemapIndexXml, createXmlResponse } from '@/utils/sitemap';
import {
  CMS_SITEMAP_NAMES,
  getCmsSitemapUrls,
} from '@/features/sitemap/sitemap.service';

export async function GET() {
  const cmsSitemaps = await Promise.all(
    CMS_SITEMAP_NAMES.map(async (name) => {
      const urls = await getCmsSitemapUrls(name).catch(() => []);

      return urls.length > 0 ? [name] : [];
    })
  );

  return createXmlResponse(
    buildSitemapIndexXml([
      { loc: getAbsoluteUrl('/sitemap.default.xml') },
      ...cmsSitemaps.flat().map((name) => ({
        loc: getAbsoluteUrl(`/sitemap.${name}.xml`),
      })),
    ])
  );
}
