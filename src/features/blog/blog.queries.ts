import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

import {
  fetchBlogBySlugApi,
  fetchBlogCategoriesApi,
  fetchBlogsApi,
  fetchLatestBlogApi,
} from './blog.api';

import type {
  BlogCategoriesResponse,
  BlogDetail,
  BlogListFilters,
  BlogListResponse,
} from './blog.types';

export const qkBlog = {
  root: ['blog'] as const,
  lists: () => [...qkBlog.root, 'list'] as const,
  list: (filters: BlogListFilters) => [...qkBlog.lists(), filters] as const,
  details: () => [...qkBlog.root, 'detail'] as const,
  detail: (slug: string, locale: string) =>
    [...qkBlog.details(), { slug, locale }] as const,
  latest: (locale: string) => [...qkBlog.root, 'latest', { locale }] as const,
  categories: (locale: string) =>
    [...qkBlog.root, 'categories', { locale }] as const,
};

type BlogQueryContext = QueryFunctionContext<readonly unknown[]>;

export const blogListQueryOptions = (filters: BlogListFilters) =>
  queryOptions<BlogListResponse>({
    queryKey: qkBlog.list(filters),
    queryFn: ({ signal }: BlogQueryContext) => fetchBlogsApi(filters, signal),
  });

export const blogDetailQueryOptions = (slug: string, locale: string) =>
  queryOptions<BlogDetail | null>({
    queryKey: qkBlog.detail(slug, locale),
    queryFn: ({ signal }: BlogQueryContext) =>
      fetchBlogBySlugApi(slug, locale, signal),
  });

export const blogLatestQueryOptions = (locale: string) =>
  queryOptions<BlogDetail | null>({
    queryKey: qkBlog.latest(locale),
    queryFn: ({ signal }: BlogQueryContext) =>
      fetchLatestBlogApi(locale, signal),
  });

export const blogCategoriesQueryOptions = (locale: string) =>
  queryOptions<BlogCategoriesResponse>({
    queryKey: qkBlog.categories(locale),
    queryFn: ({ signal }: BlogQueryContext) =>
      fetchBlogCategoriesApi(locale, signal),
  });
