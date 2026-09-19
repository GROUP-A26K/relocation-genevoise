import { notFound } from 'next/navigation';
import { HydrationBoundary } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SITE_NAME } from '@/constants/seo';
import { PageView } from '@/components/sections/CareerDetail';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import JobPostingJsonLd from '@/components/seo/JobPostingJsonLd';
import { getCmsStaticParams } from '@/features/sitemap/sitemap.service';
import { hydrateCareerDetail } from '@/features/career/career.hydration';
import {
  getLocalizedPath,
  getPageAlternates,
  getSlugByLocale,
  toHref,
} from '@/utils/seo';
import {
  fetchCareerSlugBySlug,
  fetchJobDetailBySlug,
} from '@/features/career/career.service';

import type { Metadata } from 'next';

export function generateStaticParams() {
  return getCmsStaticParams('career');
}

export default async function Page(
  props: PageProps<'/[locale]/career/[slug]'>
) {
  const { slug, locale } = await props.params;
  setRequestLocale(locale);
  const {
    state,
    detail: jobDetail,
    featuredJobs,
  } = await hydrateCareerDetail(slug, locale);

  if (!jobDetail) notFound();

  const tBreadcrumb = await getTranslations('Breadcrumb');
  const jobPath = getLocalizedPath(
    locale,
    toHref('/career/[slug]', jobDetail.slug)
  );

  return (
    <>
      <JobPostingJsonLd job={jobDetail} locale={locale} path={jobPath} />
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, path: getLocalizedPath(locale, '/') },
          {
            name: tBreadcrumb('career'),
            path: getLocalizedPath(locale, '/career'),
          },
          { name: jobDetail.title, path: jobPath },
        ]}
      />

      <HydrationBoundary state={state}>
        <PageView
          jobDetail={jobDetail}
          featuredJobs={featuredJobs.jobs}
          slug={slug}
          locale={locale}
        />
      </HydrationBoundary>
    </>
  );
}

export async function generateMetadata(
  props: PageProps<'/[locale]/career/[slug]'>
): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) return {};

  const translations = await fetchCareerSlugBySlug(`${locale}-${slug}`);

  return {
    title: jobDetail.title,
    description: jobDetail.excerpt,
    alternates: getPageAlternates(
      locale,
      '/career/[slug]',
      getSlugByLocale(locale, jobDetail.slug, translations)
    ),
  };
}
