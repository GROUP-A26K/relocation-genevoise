'use client';

import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTopLoader } from 'nextjs-toploader';

import { AppConfig } from '@/utils/appConfig';
import { getPathname, usePathname, useRouter } from '@/libs/i18nNavigation';
import { useFormDraftContext } from '@/components/providers/FormDraftProvider';
import {
  resolveAlternateSlug,
  type TAlternateContentType,
} from '@/actions/alternateSlug.action';

import type { TLocale, TPathname } from '@/utils/appConfig';

type TPushHref = Parameters<ReturnType<typeof useRouter>['push']>[0];

const TRANSLATED_SLUG_PATHNAMES: Partial<
  Record<TPathname, TAlternateContentType>
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
  const { preserveForLanguageSwitch, cancelLanguageSwitch } =
    useFormDraftContext();

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

      const href = {
        pathname,
        params: translatedSlug ? { ...params, slug: translatedSlug } : params,
        // Keep the applied filters so the form draft still matches its URL.
        query: Object.fromEntries(new URLSearchParams(window.location.search)),
      } as TPushHref;

      preserveForLanguageSwitch(
        new URL(
          getPathname({ href, locale: targetLocale }),
          window.location.origin
        ).pathname
      );
      router.push(href, { locale: targetLocale, scroll: false });
    } catch {
      cancelLanguageSwitch();
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
