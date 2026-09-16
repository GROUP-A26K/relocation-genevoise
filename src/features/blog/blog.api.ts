import { get } from '@/libs/axios';

import type {
  BlogCategoriesResponse,
  BlogListFilters,
  BlogListResponse,
  BlogDetail,
} from './blog.types';

export function fetchBlogsApi(filters: BlogListFilters, signal?: AbortSignal) {
  return get<BlogListResponse>(
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
  return get<BlogDetail | null>('/api/blog/detail', { slug, locale }, signal);
}

export function fetchLatestBlogApi(locale: string, signal?: AbortSignal) {
  return get<BlogDetail | null>('/api/blog/latest', { locale }, signal);
}

export function fetchBlogCategoriesApi(locale: string, signal?: AbortSignal) {
  return get<BlogCategoriesResponse>(
    '/api/blog/categories',
    { locale },
    signal
  );
}
