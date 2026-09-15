'use client';

import { useBlogList } from '@/features/blog/blog.hooks';

import { BlogList } from './BlogList';

import type { Blog } from '@/models/blog';

interface IHomeBlogClientProps {
  locale: string;
  blogs: Blog[];
  heading: string;
  subHeading: string;
  description: string;
  buttonText: string;
}

export function HomeBlogClient({
  locale,
  blogs: initialBlogs,
  ...copy
}: IHomeBlogClientProps) {
  const query = useBlogList({ locale, page: 1, pageSize: 3 });

  return (
    <BlogList
      blogs={query.data?.blogs ?? initialBlogs}
      {...copy}
      buttonUrl="/blog"
    />
  );
}
