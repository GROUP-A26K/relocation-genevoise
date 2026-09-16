import { dehydrate } from '@tanstack/react-query';

import { makeQueryClient } from '@/libs/queryClient';

import { qkBlog } from './blog.queries';
import {
  fetchBlogBySlug,
  fetchBlogs,
  fetchLatestBlog,
  fetchPostCategory,
} from './blog.service';

import type {
  TBlogListFilters,
  IBlogCategoriesResponse,
  IBlogDetail,
  IBlogListResponse,
} from './blog.types';

const ignore = () => undefined;

export async function hydrateBlogFeed(filters: TBlogListFilters) {
  const queryClient = makeQueryClient();
  await queryClient
    .query({
      queryKey: qkBlog.list(filters),
      queryFn: () => fetchBlogs(filters),
    })
    .catch(ignore);

  return {
    state: dehydrate(queryClient),
    blogList: queryClient.getQueryData<IBlogListResponse>(
      qkBlog.list(filters)
    ) ?? {
      blogs: [],
      meta: {
        pagination: {
          total: 0,
          page: filters.page,
          pageSize: filters.pageSize,
          pageCount: 0,
        },
      },
    },
  };
}

export async function hydrateBlogList(filters: TBlogListFilters) {
  const queryClient = makeQueryClient();
  const latest = await fetchLatestBlog(filters.locale).catch(() => null);

  const listFilters = {
    ...filters,
    exceptSlug: filters.exceptSlug ?? latest?.slug,
  };

  queryClient.setQueryData(qkBlog.latest(filters.locale), latest);

  await Promise.all([
    queryClient
      .query({
        queryKey: qkBlog.categories(filters.locale),
        queryFn: () => fetchPostCategory({ locale: filters.locale }),
      })
      .catch(ignore),
    queryClient.query({
      queryKey: qkBlog.list(listFilters),
      queryFn: () => fetchBlogs(listFilters),
    }),
  ]);

  return {
    state: dehydrate(queryClient),
    listFilters,
    latestBlog:
      queryClient.getQueryData<IBlogDetail | null>(
        qkBlog.latest(filters.locale)
      ) ?? null,
    postCategory: queryClient.getQueryData<IBlogCategoriesResponse>(
      qkBlog.categories(filters.locale)
    ) ?? { posts: [] },
    blogList: queryClient.getQueryData<IBlogListResponse>(
      qkBlog.list(listFilters)
    ) ?? {
      blogs: [],
      meta: {
        pagination: {
          total: 0,
          page: filters.page,
          pageSize: filters.pageSize,
          pageCount: 0,
        },
      },
    },
  };
}

export async function hydrateBlogDetail(slug: string, locale: string) {
  const queryClient = makeQueryClient();
  const detail = await fetchBlogBySlug(slug, locale);
  const relatedFilters: TBlogListFilters = {
    locale,
    page: 1,
    pageSize: 3,
  };

  queryClient.setQueryData(qkBlog.detail(slug, locale), detail);

  await queryClient
    .query({
      queryKey: qkBlog.list(relatedFilters),
      queryFn: () => fetchBlogs(relatedFilters),
    })
    .catch(ignore);

  return {
    state: dehydrate(queryClient),
    blogDetail:
      queryClient.getQueryData<IBlogDetail | null>(
        qkBlog.detail(slug, locale)
      ) ?? null,
    relatedBlogs: queryClient.getQueryData<IBlogListResponse>(
      qkBlog.list(relatedFilters)
    ) ?? {
      blogs: [],
      meta: { pagination: { total: 0, page: 1, pageSize: 3, pageCount: 0 } },
    },
  };
}
