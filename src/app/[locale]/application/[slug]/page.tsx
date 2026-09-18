import { notFound } from 'next/navigation';
import { HydrationBoundary } from '@tanstack/react-query';

import { getLocalizedPath, toHref } from '@/utils/seo';
import { PageView } from '@/components/sections/Application';
import { fetchJobDetailBySlug } from '@/features/career/career.service';
import { fetchCareerSlugBySlug } from '@/features/career/career.service';
import { hydrateCareerDetail } from '@/features/career/career.hydration';
import { getApplicationDraftKey } from '@/features/application/application.draft';

import type { Metadata } from 'next';

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
  const { state, detail: jobDetail } = await hydrateCareerDetail(slug, locale);
  if (!jobDetail) {
    notFound();
  }

  const fullSlug = /^[a-z]{2}-/i.test(slug) ? slug : `${locale}-${slug}`;
  const translatedSlugs = await fetchCareerSlugBySlug(fullSlug).catch(() => []);
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
