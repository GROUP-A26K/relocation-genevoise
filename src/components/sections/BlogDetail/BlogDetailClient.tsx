'use client';

import { useTranslations } from 'next-intl';

import Section from '@/components/common/Section';
import RelatedBlogs from '@/components/common/RelatedBlogs';
import { useBlogDetail, useBlogList } from '@/features/blog/blog.hooks';
import { BlogDetailHero } from '@/components/sections/BlogDetail/BlogDetailHero';

import { ContentView } from './ContentView';

import type { IBlog, IBlogDetail } from '@/models/blog';

interface IBlogDetailClientProps {
  slug: string;
  locale: string;
  blog: IBlogDetail;
  relatedBlogs: IBlog[];
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
        <RelatedBlogs
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
