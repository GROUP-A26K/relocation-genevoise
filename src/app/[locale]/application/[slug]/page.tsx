import { notFound } from 'next/navigation';

import { getI18nPath } from '@/utils/Helpers';
import { PageView } from '@/components/sections/Application';
import { fetchJobDetailBySlug } from '@/services/career/career.service';

import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string; locale: string }>;
};

export default async function Page(props: Props) {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);
  if (!jobDetail) {
    notFound();
  }

  return <PageView jobDetail={jobDetail} />;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const jobDetail = await fetchJobDetailBySlug(slug, locale);

  if (!jobDetail) return {};

  return {
    title: jobDetail.title,
    description: jobDetail.excerpt,
    alternates: {
      canonical: getI18nPath(`/application/${slug}`, locale),
    },
  };
}
