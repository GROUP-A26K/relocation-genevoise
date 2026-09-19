import { createUrlsetResponse } from '@/utils/sitemap';
import { getCmsSitemapUrls } from '@/features/sitemap/sitemap.service';

export function GET() {
  return createUrlsetResponse('properties', () =>
    getCmsSitemapUrls('properties')
  );
}
