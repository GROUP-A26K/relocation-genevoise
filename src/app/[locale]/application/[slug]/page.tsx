import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { HydrationBoundary } from '@tanstack/react-query';

import { toCmsSlug } from '@/utils/slug';
import { getLocalizedPath, toHref } from '@/utils/seo';
import { PageView } from '@/components/sections/Application';
import { hydrateCareerDetail } from '@/features/career/career.hydration';
import { getApplicationDraftKey } from '@/features/application/application.draft';
import {
  fetchJobDetailBySlug,
  fetchCareerSlugBySlug,
} from '@/features/career/career.service';

import type { Metadata } from 'next';

export function generateStaticParams() {
  return [];
}

export async function generateMetadata(
  props: PageProps<'/[locale]/application/[slug]'>
): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) return {};

  return {
    title: jobDetail.title,
    description: jobDetail.excerpt,
    alternates: {
      canonical: getLocalizedPath(locale, toHref('/application/[slug]', slug)),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function Page(
  props: PageProps<'/[locale]/application/[slug]'>
) {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);
  const { state, detail: jobDetail } = await hydrateCareerDetail(slug, locale);
  if (!jobDetail) {
    notFound();
  }

  const translatedSlugs = await fetchCareerSlugBySlug(
    toCmsSlug(slug, locale)
  ).catch(() => []);
  const draftKey = getApplicationDraftKey(jobDetail.id, translatedSlugs);

  return (
    <HydrationBoundary state={state}>
      <PageView
        jobDetail={jobDetail}
        slug={slug}
        locale={locale}
        draftKey={draftKey}
      />
    </HydrationBoundary>
  );
}
