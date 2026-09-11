import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/constants/seo';
import { getLocalizedPath } from '@/utils/seo';
import { PageView } from '@/components/sections/CareerDetail';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import {
  fetchJobDetailBySlug,
  fetchFeaturedJobPosts,
} from '@/services/career/career.service';

import type { Metadata } from 'next';

const NUMBER_OF_FEATURED_JOBS = 5;

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function Page(props: Props) {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) notFound();

  const { jobs: featuredJobs } = await fetchFeaturedJobPosts(slug, {
    locale,
    filterBy: jobDetail.department,
    limit: NUMBER_OF_FEATURED_JOBS,
  });

  const tBreadcrumb = await getTranslations('Breadcrumb');

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, path: getLocalizedPath(locale, 'home') },
          {
            name: tBreadcrumb('career'),
            path: getLocalizedPath(locale, 'career'),
          },
          {
            name: jobDetail.title,
            path: getLocalizedPath(locale, 'career', jobDetail.slug),
          },
        ]}
      />

      <PageView jobDetail={jobDetail} featuredJobs={featuredJobs} />
    </>
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) return {};

  return {
    title: jobDetail.title,
    description: jobDetail.excerpt,
    alternates: {
      canonical: getLocalizedPath(locale, 'career', jobDetail.slug),
    },
  };
}
