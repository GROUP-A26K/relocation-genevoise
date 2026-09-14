import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

import { AppConfig } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
  localeDetection: false,
  alternateLinks: false,
});

export const { usePathname, useRouter, Link } = createNavigation(routing);
