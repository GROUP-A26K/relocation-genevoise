import { getJson } from '@/libs/apiClient';

import type {
  BlogCategoriesResponse,
  BlogListFilters,
  BlogListResponse,
  BlogDetail,
} from './blog.types';

export function fetchBlogsApi(filters: BlogListFilters, signal?: AbortSignal) {
  return getJson<BlogListResponse>(
    '/api/blog',
    {
      locale: filters.locale,
      page: filters.page,
      pageSize: filters.pageSize,
      filterBy: filters.filterBy,
      search: filters.search,
      exceptSlug: filters.exceptSlug,
    },
    signal
  );
}

export function fetchBlogBySlugApi(
  slug: string,
  locale: string,
  signal?: AbortSignal
) {
  return getJson<BlogDetail | null>(
    '/api/blog/detail',
    { slug, locale },
    signal
  );
}

export function fetchLatestBlogApi(locale: string, signal?: AbortSignal) {
  return getJson<BlogDetail | null>('/api/blog/latest', { locale }, signal);
}

export function fetchBlogCategoriesApi(locale: string, signal?: AbortSignal) {
  return getJson<BlogCategoriesResponse>(
    '/api/blog/categories',
    { locale },
    signal
  );
}
