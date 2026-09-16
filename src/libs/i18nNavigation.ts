import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

import { AppConfig } from '@/utils/appConfig';

import type { ComponentProps } from 'react';

export const routing = defineRouting({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
  localeDetection: false,
  localeCookie: false,
  alternateLinks: false,
  pathnames: AppConfig.pathnames,
});

const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export type THref = ComponentProps<typeof Link>['href'];

export { Link, redirect, usePathname, useRouter, getPathname };
