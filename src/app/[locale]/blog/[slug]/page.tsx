import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { HydrationBoundary } from '@tanstack/react-query';

import { SITE_NAME } from '@/constants/seo';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { hydrateBlogDetail } from '@/features/blog/blog.hydration';
import { BlogDetailClient } from '@/components/sections/BlogDetail/BlogDetailClient';
import {
  fetchBlogBySlug,
  fetchBlogSlugBySlug,
} from '@/features/blog/blog.service';
import {
  getLocalizedPath,
  getOgLocale,
  getPageAlternates,
  getSlugByLocale,
  toHref,
  toIsoDate,
} from '@/utils/seo';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/blog/[slug]'>
): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const blogDetail = await fetchBlogBySlug(slug, locale);

  if (!blogDetail) return {};

  const translations = await fetchBlogSlugBySlug(blogDetail.slug);
  const alternates = getPageAlternates(
    locale,
    '/blog/[slug]',
    getSlugByLocale(locale, slug, translations)
  );
  const { canonical } = alternates;
  const images = [{ url: blogDetail.imageUrl, alt: blogDetail.title }];

  return {
    title: blogDetail.title,
    description: blogDetail.description,
    openGraph: {
      type: 'article',
      locale: getOgLocale(locale),
      siteName: SITE_NAME,
      url: canonical,
      publishedTime: toIsoDate(blogDetail.publishedDate),
      modifiedTime: toIsoDate(blogDetail.updatedAt),
      authors: [blogDetail.author.name],
      images,
    },
    twitter: {
      images,
    },
    alternates,
  };
}

export default async function Page(props: PageProps<'/[locale]/blog/[slug]'>) {
  const { slug, locale } = await props.params;

  const tBreadcrumb = await getTranslations('Breadcrumb');

  const { state, blogDetail, relatedBlogs } = await hydrateBlogDetail(
    slug,
    locale
  );

  if (!blogDetail) {
    notFound();
  }

  const blogPath = getLocalizedPath(locale, toHref('/blog/[slug]', slug));

  return (
    <>
      <BlogJsonLd blog={blogDetail} locale={locale} path={blogPath} />
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, path: getLocalizedPath(locale, '/') },
          {
            name: tBreadcrumb('blog'),
            path: getLocalizedPath(locale, '/blog'),
          },
          { name: blogDetail.title, path: blogPath },
        ]}
      />

      <HydrationBoundary state={state}>
        <BlogDetailClient
          slug={slug}
          locale={locale}
          blog={blogDetail}
          relatedBlogs={relatedBlogs.blogs}
        />
      </HydrationBoundary>
    </>
  );
}
