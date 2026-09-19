import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

import {
  fetchBlogBySlugApi,
  fetchBlogCategoriesApi,
  fetchBlogsApi,
  fetchLatestBlogApi,
} from './blog.api';

import type {
  IBlogCategoriesResponse,
  IBlogDetail,
  TBlogListFilters,
  IBlogListResponse,
} from './blog.types';

export const qkBlog = {
  root: ['blog'] as const,
  lists: () => [...qkBlog.root, 'list'] as const,
  list: (filters: TBlogListFilters) => [...qkBlog.lists(), filters] as const,
  details: () => [...qkBlog.root, 'detail'] as const,
  detail: (slug: string, locale: string) =>
    [...qkBlog.details(), { slug, locale }] as const,
  latest: (locale: string) => [...qkBlog.root, 'latest', { locale }] as const,
  categories: (locale: string) =>
    [...qkBlog.root, 'categories', { locale }] as const,
};

type TBlogQueryContext = QueryFunctionContext<readonly unknown[]>;

export const blogListQueryOptions = (filters: TBlogListFilters) =>
  queryOptions<IBlogListResponse>({
    queryKey: qkBlog.list(filters),
    queryFn: ({ signal }: TBlogQueryContext) => fetchBlogsApi(filters, signal),
  });

export const blogDetailQueryOptions = (slug: string, locale: string) =>
  queryOptions<IBlogDetail | null>({
    queryKey: qkBlog.detail(slug, locale),
    queryFn: ({ signal }: TBlogQueryContext) =>
      fetchBlogBySlugApi(slug, locale, signal),
  });

export const blogLatestQueryOptions = (locale: string) =>
  queryOptions<IBlogDetail | null>({
    queryKey: qkBlog.latest(locale),
    queryFn: ({ signal }: TBlogQueryContext) =>
      fetchLatestBlogApi(locale, signal),
  });

export const blogCategoriesQueryOptions = (locale: string) =>
  queryOptions<IBlogCategoriesResponse>({
    queryKey: qkBlog.categories(locale),
    queryFn: ({ signal }: TBlogQueryContext) =>
      fetchBlogCategoriesApi(locale, signal),
  });
