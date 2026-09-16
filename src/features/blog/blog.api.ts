import { get } from '@/libs/axios';

import type {
  IBlogCategoriesResponse,
  TBlogListFilters,
  IBlogListResponse,
  IBlogDetail,
} from './blog.types';

export function fetchBlogsApi(filters: TBlogListFilters, signal?: AbortSignal) {
  return get<IBlogListResponse>(
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
  return get<IBlogDetail | null>('/api/blog/detail', { slug, locale }, signal);
}

export function fetchLatestBlogApi(locale: string, signal?: AbortSignal) {
  return get<IBlogDetail | null>('/api/blog/latest', { locale }, signal);
}

export function fetchBlogCategoriesApi(locale: string, signal?: AbortSignal) {
  return get<IBlogCategoriesResponse>(
    '/api/blog/categories',
    { locale },
    signal
  );
}
