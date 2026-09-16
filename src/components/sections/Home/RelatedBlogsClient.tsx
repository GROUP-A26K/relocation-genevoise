'use client';

import { useBlogList } from '@/features/blog/blog.hooks';
import RelatedBlogs from '@/components/common/RelatedBlogs';

import type { IBlog } from '@/models/blog';

interface IRelatedBlogsClientProps {
  locale: string;
  blogs: IBlog[];
  heading: string;
  subHeading: string;
  description: string;
  buttonText: string;
}

export default function RelatedBlogsClient({
  locale,
  blogs: initialBlogs,
  ...copy
}: IRelatedBlogsClientProps) {
  const query = useBlogList({ locale, page: 1, pageSize: 3 });

  return (
    <RelatedBlogs
      blogs={query.data?.blogs ?? initialBlogs}
      {...copy}
      buttonUrl="/blog"
    />
  );
}
