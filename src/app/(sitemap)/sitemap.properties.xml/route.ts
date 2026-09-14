import { createUrlsetResponse } from '@/utils/sitemap';
import { getCmsSitemapUrls } from '@/services/sitemap.service';

export function GET() {
  return createUrlsetResponse('properties', () =>
    getCmsSitemapUrls('properties')
  );
}
