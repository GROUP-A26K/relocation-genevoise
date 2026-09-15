'use client';

import { useTranslations } from 'next-intl';

import Section from '@/components/customs/Section';
import { BlogList } from '@/components/blocks/Blog';
import { BlogDetailHero } from '@/components/blocks/Hero';
import { useBlogDetail, useBlogList } from '@/features/blog/blog.hooks';

import { ContentView } from './ContentView';

import type { Blog, BlogDetail } from '@/models/blog';

interface IBlogDetailClientProps {
  slug: string;
  locale: string;
  blog: BlogDetail;
  relatedBlogs: Blog[];
}

export function BlogDetailClient({
  slug,
  locale,
  blog: initialBlog,
  relatedBlogs: initialRelated,
}: IBlogDetailClientProps) {
  const t = useTranslations('BlogDetail');
  const detailQuery = useBlogDetail(slug, locale);
  const relatedQuery = useBlogList({ locale, page: 1, pageSize: 3 });
  const blog = detailQuery.data ?? initialBlog;
  const relatedBlogs = relatedQuery.data?.blogs ?? initialRelated;

  return (
    <>
      <Section revealTrigger="load" dividerProps={{ className: 'hidden' }}>
        <BlogDetailHero {...blog} />
      </Section>

      <ContentView tableOfContent={t('tableContent')} blog={blog} />

      <Section>
        <BlogList
          blogs={relatedBlogs}
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
