'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';

import { AppConfig } from '@/utils/appConfig';
import { usePathname, useRouter } from '@/libs/i18nNavigation';
import {
  resolveAlternateSlug,
  type AlternateContentType,
} from '@/actions/alternateSlug.action';

import type { TLocale, TPathname } from '@/utils/appConfig';

type TPushHref = Parameters<ReturnType<typeof useRouter>['push']>[0];

const TRANSLATED_SLUG_PATHNAMES: Partial<
  Record<TPathname, AlternateContentType>
> = {
  '/blog/[slug]': 'blog',
  '/career/[slug]': 'career',
  '/application/[slug]': 'career',
  '/properties/[slug]': 'property',
  '/properties/[slug]/photo-tour': 'property',
};

export const useLanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = useLocale();
  const loader = useTopLoader();

  const [isRotated, setIsRotated] = useState(false);
  const [pendingLocale, setPendingLocale] = useState<TLocale | null>(null);

  useEffect(() => {
    setIsRotated((previous) => !previous);
    setPendingLocale(null);
  }, [locale]);

  const switchTo = async (targetLocale: TLocale) => {
    if (targetLocale === locale || pendingLocale) return;

    setPendingLocale(targetLocale);
    loader.start();

    const contentType = TRANSLATED_SLUG_PATHNAMES[pathname];
    const currentSlug = params.slug;

    try {
      const translatedSlug =
        contentType && typeof currentSlug === 'string'
          ? await resolveAlternateSlug(
              contentType,
              `${locale}-${currentSlug}`,
              targetLocale
            ).catch(() => null)
          : null;

      router.push(
        {
          pathname,
          params: translatedSlug ? { ...params, slug: translatedSlug } : params,
        } as TPushHref,
        { locale: targetLocale, scroll: false }
      );
    } catch {
      loader.done();
      setPendingLocale(null);
    }
  };

  return {
    locales: AppConfig.locales,
    locale,
    isRotated,
    pendingLocale,
    switchTo,
  };
};
