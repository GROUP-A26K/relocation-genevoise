import { PageView } from '@/components/sections/CareerDetail';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
const NUMBER_OF_FEATURED_JOBS = 5;

import {
  fetchJobDetailBySlug,
  fetchFeaturedJobPosts,
} from '@/services/career/career.service';

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

  return <PageView jobDetail={jobDetail} featuredJobs={featuredJobs} />;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) return {};

  return {
    title: jobDetail.title,
    description: jobDetail.excerpt,
  };
}
