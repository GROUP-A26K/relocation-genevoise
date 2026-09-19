import 'server-only';

import { toUrlSlug } from '@/utils/slug';
import { formatDate } from '@/utils/helpers';
import { sanityFetch } from '@/sanity/lib/fetch';
import { getBlogMessages, getImageMessages } from '@/utils/imageMessages';
import {
  POST_CATEGORIES_QUERY,
  BLOGS_QUERY,
  BLOG_DETAIL_QUERY,
  BLOGS_SITEMAP_QUERY,
  BLOG_SLUG_QUERY,
  BLOG_LATEST_QUERY,
} from '@/sanity/lib/queries';

import type { IMeta } from '@/models/meta';
import type { TLocale } from '@/utils/appConfig';
import type { IBlog, IBlogDetail, IBlogSitemap } from '@/models/blog';

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
  body?: IBlogDetail['body'] | null;
  mainPhoto: {
    photoAlt?: string | null;
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

export type TBlogParams = {
  page?: number;
  filterBy?: string;
  search?: string;
  pageSize?: number;
  locale?: string;
  start?: number;
  limit?: number;
  exceptSlug?: string;
};

const toBlog = (
  post: TBlogPostProjection,
  publishedDate: string,
  locale: TLocale
): IBlog => {
  const imageT = getImageMessages(locale);
  const blogT = getBlogMessages(locale);
  const title = post.title || blogT.fallback.title;
  const imageUrl = post.mainPhoto?.photo?.asset?.url || FALLBACK_IMAGE;

  return {
    id: post._id,
    title,
    href: {
      pathname: '/blog/[slug]',
      params: { slug: toUrlSlug(post?.slug?.current || '') },
    },
    description: post?.summary || blogT.fallback.summary,
    timeToRead: post?.timeToRead || 0,
    publishedDate,
    slug: post?.slug?.current || '',
    imageUrl,
    imageAlt: post.mainPhoto?.photo?.asset?.url
      ? post.mainPhoto.photoAlt || title
      : imageT.common.photo,
    imageLqip: post.mainPhoto?.photo?.asset?.lqip ?? undefined,
    time: '3',
    category:
      post?.category?.map((cat) => ({
        title: cat?.name || blogT.fallback.category,
      })) || [],
    author: {
      name: post.author?.name || blogT.fallback.author,
      role: blogT.fallback.role,
      email: post.author?.email || blogT.fallback.email,
      imageUrl: post.author?.authorAvatar?.asset?.url || FALLBACK_IMAGE,
      imageAlt: post.author?.authorAvatar?.asset?.url
        ? imageT.common.author
        : imageT.common.photo,
      imageLqip: post.author?.authorAvatar?.asset?.lqip ?? undefined,
    },
  };
};

const toBlogDetail = (
  post: TBlogPostProjection,
  locale: TLocale
): IBlogDetail => ({
  ...toBlog(
    post,
    post?.publishedDate || getBlogMessages(locale).fallback.date,
    locale
  ),
  body: post?.body || [],
  updatedAt: post?._updatedAt,
});

export const fetchBlogs = async (
  params?: TBlogParams
): Promise<{ blogs: IBlog[]; meta: IMeta }> => {
  const pageSize = params?.pageSize || 10;
  const locale: TLocale = params?.locale === 'fr' ? 'fr' : 'en';
  const blogT = getBlogMessages(locale);
  const end = (params?.page || 1) * pageSize;
  const start = end - pageSize;

  const response = await sanityFetch(
    BLOGS_QUERY,
    {
      start: start,
      end: end,
      locale,
      category: params?.filterBy ?? '',
      title: params?.search ? `*${params?.search}*` : '',
      slug: params?.exceptSlug ?? '',
    },
    params?.search ? { cache: 'no-store' } : { tags: ['blogs'] }
  );

  return {
    blogs: response.blogs.map((post) =>
      toBlog(
        post,
        post?.publishedDate
          ? formatDate(post.publishedDate, locale)
          : blogT.fallback.date,
        locale
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
): Promise<IBlogDetail | null> => {
  const normalizedLocale: TLocale = locale === 'fr' ? 'fr' : 'en';
  const response = await sanityFetch(
    BLOG_DETAIL_QUERY,
    { slug: `${normalizedLocale}-${slug}` },
    { tags: ['blog'] }
  );

  return response ? toBlogDetail(response, normalizedLocale) : null;
};

export const fetchSitemapBlogs = async (
  params?: TBlogParams
): Promise<{ blogs: IBlogSitemap[]; meta: IMeta }> => {
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
      title:
        post.title ||
        getBlogMessages(params?.locale === 'fr' ? 'fr' : 'en').fallback.title,
      slug: post?.slug?.current || '',
      href: {
        pathname: '/blog/[slug]',
        params: {
          slug: toUrlSlug(post?.slug?.current || ''),
        },
      },
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
): Promise<IBlogDetail | null> => {
  const normalizedLocale: TLocale = locale === 'fr' ? 'fr' : 'en';
  const response = await sanityFetch(
    BLOG_LATEST_QUERY,
    { locale: normalizedLocale },
    { tags: ['blog'] }
  );

  return response ? toBlogDetail(response, normalizedLocale) : null;
};

export async function fetchPostCategory(params?: TBlogParams) {
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
        href: {
          pathname: '/blog/[slug]',
          params: { slug: toUrlSlug(current) },
        },
      },
    ];
  });
};
