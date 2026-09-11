import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { SITE_NAME } from '@/constants/seo';
import Section from '@/components/customs/Section';
import { BlogList } from '@/components/blocks/Blog';
import BlogJsonLd from '@/components/seo/BlogJsonLd';
import { BlogDetailHero } from '@/components/blocks/Hero';
import { ContentView } from '@/components/sections/BlogDetail';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { fetchBlogBySlug, fetchBlogs } from '@/services/blog.service';
import { getLocalizedPath, getOgLocale, toIsoDate } from '@/utils/seo';

import type { Metadata } from 'next';

export async function generateMetadata(
  props: PageProps<'/[locale]/blog/[slug]'>
): Promise<Metadata> {
  const { slug, locale } = await props.params;
  const blogDetail = await fetchBlogBySlug(slug, locale);

  if (!blogDetail) return {};

  const canonical = getLocalizedPath(locale, 'blog', slug);
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
    alternates: {
      canonical,
    },
  };
}

export default async function Page(props: PageProps<'/[locale]/blog/[slug]'>) {
  const { slug, locale } = await props.params;

  const t = await getTranslations('BlogDetail');
  const tBreadcrumb = await getTranslations('Breadcrumb');

  const blogDetail = await fetchBlogBySlug(slug, locale);

  if (!blogDetail) {
    notFound();
  }

  const { blogs } = await fetchBlogs({
    page: 1,
    pageSize: 3,
    locale: locale,
  });

  const blogPath = getLocalizedPath(locale, 'blog', slug);

  return (
    <>
      <BlogJsonLd blog={blogDetail} locale={locale} path={blogPath} />
      <BreadcrumbJsonLd
        items={[
          { name: SITE_NAME, path: getLocalizedPath(locale, 'home') },
          { name: tBreadcrumb('blog'), path: getLocalizedPath(locale, 'blog') },
          { name: blogDetail.title, path: blogPath },
        ]}
      />

      <Section revealTrigger="load" dividerProps={{ className: 'hidden' }}>
        <BlogDetailHero {...blogDetail} />
      </Section>

      <ContentView tableOfContent={t('tableContent')} blog={blogDetail} />

      <Section>
        <BlogList
          blogs={blogs}
          heading={t('BlogList.heading')}
          subHeading={t('BlogList.subHeading')}
          description={t('BlogList.description')}
          buttonText={t('BlogList.buttonText')}
          buttonUrl="/blog"
        />
      </Section>
    </>
  );
}
