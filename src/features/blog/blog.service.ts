import 'server-only';

import { formatDate } from '@/utils/helpers';
import { sanityFetch } from '@/sanity/lib/fetch';
import {
  POST_CATEGORIES_QUERY,
  BLOGS_QUERY,
  BLOG_DETAIL_QUERY,
  BLOGS_SITEMAP_QUERY,
  BLOG_SLUG_QUERY,
  BLOG_LATEST_QUERY,
} from '@/sanity/lib/queries';

import type { Meta } from '@/models/meta';
import type { Blog, BlogDetail, BlogSitemap } from '@/models/blog';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&auto=format&fit=crop&w=3603&q=80';

type TBlogPostProjection = {
  _id: string;
  _updatedAt?: string;
  title: string | null;
  summary: string | null;
  slug: { current?: string } | null;
  timeToRead: number | null;
  publishedDate: string | null;
  body?: BlogDetail['body'] | null;
  mainPhoto: {
    photo: {
      asset: { url: string | null; lqip: string | null } | null;
    } | null;
  } | null;
  category: { name: string | null }[] | null;
  author: {
    name: string | null;
    email: string | null;
    authorAvatar: {
      asset: { url: string | null; lqip: string | null } | null;
    } | null;
  } | null;
};

export interface ParamsProps {
  page?: number;
  filterBy?: string;
  search?: string;
  pageSize?: number;
  locale?: string;
  start?: number;
  limit?: number;
  exceptSlug?: string;
}

const toBlog = (post: TBlogPostProjection, publishedDate: string): Blog => ({
  id: post._id,
  title: post.title || 'Untitled Post',
  href: `/blog/${(post?.slug?.current || '').replace(/^[a-z]{2}-/i, '')}`,
  description: post?.summary || 'No summary available',
  timeToRead: post?.timeToRead || 0,
  publishedDate,
  slug: post?.slug?.current || '',
  imageUrl: post.mainPhoto?.photo?.asset?.url || FALLBACK_IMAGE,
  imageLqip: post.mainPhoto?.photo?.asset?.lqip ?? undefined,
  time: '3',
  category:
    post?.category?.map((cat) => ({
      title: cat?.name || 'Unknown Category',
      href: `/blog/category/${cat?.name || ''}`,
    })) || [],
  author: {
    name: post.author?.name || 'Unknown Author',
    role: 'Author',
    href: `/blog/author/${post?.author?.name || ''}`,
    email: post.author?.email || 'Unknown Email',
    imageUrl: post.author?.authorAvatar?.asset?.url || FALLBACK_IMAGE,
    imageLqip: post.author?.authorAvatar?.asset?.lqip ?? undefined,
  },
});

const toBlogDetail = (post: TBlogPostProjection): BlogDetail => ({
  ...toBlog(post, post?.publishedDate || 'Unknown Date'),
  body: post?.body || [],
  updatedAt: post?._updatedAt,
});

export const fetchBlogs = async (
  params?: ParamsProps
): Promise<{ blogs: Blog[]; meta: Meta }> => {
  const pageSize = params?.pageSize || 10;
  const end = (params?.page || 1) * pageSize;
  const start = end - pageSize;

  const response = await sanityFetch(
    BLOGS_QUERY,
    {
      start: start,
      end: end,
      locale: params?.locale ?? 'en',
      category: params?.filterBy ?? '',
      title: params?.search ? `*${params?.search}*` : '',
      slug: params?.exceptSlug ?? '',
    },
    { tags: ['blogs'] }
  );

  return {
    blogs: response.blogs.map((post) =>
      toBlog(
        post,
        post?.publishedDate
          ? formatDate(post.publishedDate, params?.locale ?? 'en')
          : 'Unknown Date'
      )
    ),
    meta: {
      pagination: {
        total: response.total,
        page: params?.page || 1,
        pageSize,
        pageCount: Math.ceil(response.total / pageSize),
      },
    },
  };
};

export const fetchBlogBySlug = async (
  slug: string,
  locale: string = 'en'
): Promise<BlogDetail | null> => {
  const response = await sanityFetch(
    BLOG_DETAIL_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ['blog'] }
  );

  return response ? toBlogDetail(response) : null;
};

export const fetchSitemapBlogs = async (
  params?: ParamsProps
): Promise<{ blogs: BlogSitemap[]; meta: Meta }> => {
  const response = await sanityFetch(
    BLOGS_SITEMAP_QUERY,
    {
      locale: params?.locale ?? 'en',
      category: '',
      title: '',
    },
    { tags: ['sitemap-blogs'] }
  );

  return {
    blogs: response.blogs.map((post) => ({
      id: post._id,
      title: post.title || 'Untitled Post',
      slug: post?.slug?.current || '',
      href: `/blog/${(post?.slug?.current || '').replace(/^[a-z]{2}-/i, '')}`,
    })),
    meta: {
      pagination: {
        total: response.total,
        page: params?.page || 1,
        pageSize: params?.pageSize || 10,
        pageCount: Math.ceil(response.total / (params?.pageSize || 10)),
      },
    },
  };
};

export const fetchLatestBlog = async (
  locale: string = 'fr'
): Promise<BlogDetail | null> => {
  const response = await sanityFetch(
    BLOG_LATEST_QUERY,
    { locale },
    { tags: ['blog'] }
  );

  return response ? toBlogDetail(response) : null;
};

export async function fetchPostCategory(params?: ParamsProps) {
  const posts = await sanityFetch(
    POST_CATEGORIES_QUERY,
    { locale: params?.locale ?? 'en' },
    { tags: ['categories'] }
  );

  return {
    posts,
  };
}

export const fetchBlogSlugBySlug = async (slug: string) => {
  const response = await sanityFetch(
    BLOG_SLUG_QUERY,
    { slug },
    { tags: ['blog'] }
  );

  return (response?.targetSlug ?? []).flatMap((item) => {
    const current = item?.slug?.current;

    if (!item?.language || !current) {
      return [];
    }

    return [
      {
        locale: item.language,
        slug: current,
        href: `/blog/${current.replace(/^[a-z]{2}-/i, '')}`,
      },
    ];
  });
};
