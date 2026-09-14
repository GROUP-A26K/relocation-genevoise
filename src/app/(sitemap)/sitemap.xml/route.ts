import { getAbsoluteUrl } from '@/utils/seo';
import { CMS_SITEMAP_NAMES } from '@/services/sitemap.service';
import { buildSitemapIndexXml, createXmlResponse } from '@/utils/sitemap';

export function GET() {
  return createXmlResponse(
    buildSitemapIndexXml([
      { loc: getAbsoluteUrl('/sitemap.default.xml') },
      ...CMS_SITEMAP_NAMES.map((name) => ({
        loc: getAbsoluteUrl(`/sitemap.${name}.xml`),
      })),
    ])
  );
}
