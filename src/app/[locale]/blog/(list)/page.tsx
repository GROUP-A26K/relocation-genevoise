import { Suspense } from 'react';
import { HydrationBoundary } from '@tanstack/react-query';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { PageView } from '@/components/sections/Blog/PageView';
import { hydrateBlogList } from '@/features/blog/blog.hydration';
import { getLocalizedPath, getPageAlternates } from '@/utils/seo';
import PageBreadcrumbJsonLd from '@/components/seo/PageBreadcrumbJsonLd';
import { BlogPageSkeleton } from '@/components/sections/Blog/BlogPageSkeleton';
import {
  normalizeBlogListFilters,
  parseBlogSearchParams,
} from '@/features/blog/blog.searchParams';

import type { Metadata } from 'next';

const PAGE_SIZE = 9;

export async function generateMetadata(
  props: PageProps<'/[locale]/blog'>
): Promise<Metadata> {
  const { locale } = await props.params;
  const {
    page: pageNumber,
    filterBy,
    search,
  } = parseBlogSearchParams(await props.searchParams);
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.Blog',
  });

  const basePath = getLocalizedPath(locale, '/blog');
  const alternates = getPageAlternates(locale, '/blog');
  const canonical =
    pageNumber > 1 && !filterBy && !search
      ? `${basePath}?page=${pageNumber}`
      : alternates.canonical;

  return {
    title: t('title'),
    description: t('description'),
    alternates: { ...alternates, canonical },
    ...(filterBy || search ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function Page(props: PageProps<'/[locale]/blog'>) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const filters = parseBlogSearchParams(await props.searchParams);

  const { state, latestBlog, postCategory, blogList } = await hydrateBlogList(
    normalizeBlogListFilters({ locale, pageSize: PAGE_SIZE, ...filters })
  );

  return (
    <>
      <PageBreadcrumbJsonLd locale={locale} trail={['/blog']} />

      <Suspense fallback={<BlogPageSkeleton />}>
        <HydrationBoundary state={state}>
          <PageView
            category={postCategory.posts}
            newestBlog={latestBlog}
            blogs={blogList.blogs}
            meta={blogList.meta}
          />
        </HydrationBoundary>
      </Suspense>
    </>
  );
}
