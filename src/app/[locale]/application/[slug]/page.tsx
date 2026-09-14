import { notFound } from 'next/navigation';
import { HydrationBoundary } from '@tanstack/react-query';

import { getI18nPath } from '@/utils/Helpers';
import { PageView } from '@/components/sections/Application';
import { fetchJobDetailBySlug } from '@/features/career/career.service';
import { hydrateCareerDetail } from '@/features/career/career.hydration';

import type { Metadata } from 'next';

export default async function Page(
  props: PageProps<'/[locale]/application/[slug]'>
) {
  const { slug, locale } = await props.params;
  const { state, detail: jobDetail } = await hydrateCareerDetail(slug, locale);
  if (!jobDetail) {
    notFound();
  }

  return (
    <HydrationBoundary state={state}>
      <PageView jobDetail={jobDetail} slug={slug} locale={locale} />
    </HydrationBoundary>
  );
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
      canonical: getI18nPath(`/application/${slug}`, locale),
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}
