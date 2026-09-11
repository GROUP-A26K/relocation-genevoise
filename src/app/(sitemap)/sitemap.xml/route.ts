import { getAbsoluteUrl } from '@/utils/seo';
import {
  CMS_SITEMAP_NAMES,
  getCmsSitemapUrls,
} from '@/services/sitemap.service';
import {
  buildSitemapIndexXml,
  createXmlResponse,
  getLatestModified,
  type TSitemapIndexEntry,
} from '@/utils/sitemap';

export async function GET() {
  try {
    const cmsEntries = await Promise.all(
      CMS_SITEMAP_NAMES.map(async (name): Promise<TSitemapIndexEntry[]> => {
        const urls = await getCmsSitemapUrls(name);

        return urls.length
          ? [
              {
                loc: getAbsoluteUrl(`/sitemap.${name}.xml`),
                lastModified: getLatestModified(urls),
              },
            ]
          : [];
      })
    );

    return createXmlResponse(
      buildSitemapIndexXml([
        { loc: getAbsoluteUrl('/sitemap.default.xml') },
        ...cmsEntries.flat(),
      ])
    );
  } catch (error) {
    console.error('[sitemap:index] generation failed:', error);

    return new Response('Error generating sitemap index', { status: 500 });
  }
}
