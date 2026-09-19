import { Env } from '@/libs/env';
import { getBaseUrl } from '@/utils/helpers';

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
