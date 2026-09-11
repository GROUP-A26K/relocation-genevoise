import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import { getLocalizedPath } from '@/utils/seo';
import { PageView } from '@/components/sections/Career';
import {
  fetchDepartments,
  fetchJobPosts,
} from '@/services/career/career.service';

import type { Metadata } from 'next';

const PAGE_SIZE = 5;

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; filterBy?: string }>;
};
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Career',
  });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getLocalizedPath(locale, 'career'),
    },
  };
}
export default async function Page(props: Props) {
  const { locale } = await props.params;
  const { page, filterBy } = await props.searchParams;

  const [{ departments }, { jobs, meta }] = await Promise.all([
    fetchDepartments({ locale }),
    fetchJobPosts({
      locale,
      page: Number(page) || 1,
      pageSize: PAGE_SIZE,
      filterBy: filterBy ?? '',
    }),
  ]);

  return (
    <Suspense fallback={null}>
      <PageView departments={departments} jobs={jobs} meta={meta} />
    </Suspense>
  );
}
