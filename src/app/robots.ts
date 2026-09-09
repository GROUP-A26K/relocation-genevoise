import { Env } from '@/libs/Env';
import { getBaseUrl } from '@/utils/Helpers';

import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const isProduction = Env.NEXT_APP_ENV === 'production';

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [`${getBaseUrl()}/sitemap.xml`],
  };
}
