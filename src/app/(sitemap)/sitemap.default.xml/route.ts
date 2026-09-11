import { createUrlsetResponse } from '@/utils/sitemap';
import { getStaticSitemapUrls } from '@/services/sitemap.service';

export function GET() {
  return createUrlsetResponse('default', getStaticSitemapUrls);
}
