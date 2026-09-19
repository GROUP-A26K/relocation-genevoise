import { createUrlsetResponse } from '@/utils/sitemap';
import { getStaticSitemapUrls } from '@/features/sitemap/sitemap.service';

export function GET() {
  return createUrlsetResponse('default', getStaticSitemapUrls);
}
