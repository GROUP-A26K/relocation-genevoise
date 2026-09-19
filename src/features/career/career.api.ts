import { get } from '@/libs/axios';

import type {
  ICareerDepartmentsResponse,
  TCareerFeaturedFilters,
  ICareerFeaturedResponse,
  TCareerListFilters,
  ICareerListResponse,
  IJobDetail,
} from './career.types';

export function fetchCareerListApi(
  filters: TCareerListFilters,
  signal?: AbortSignal
) {
  return get<ICareerListResponse>(
    '/api/career',
    {
      locale: filters.locale,
      page: filters.page,
      pageSize: filters.pageSize,
      filterBy: filters.filterBy,
      search: filters.search,
    },
    signal
  );
}

export function fetchCareerDetailApi(
  slug: string,
  locale: string,
  signal?: AbortSignal
) {
  return get<IJobDetail | null>('/api/career/detail', { slug, locale }, signal);
}

export function fetchCareerDepartmentsApi(
  locale: string,
  signal?: AbortSignal
) {
  return get<ICareerDepartmentsResponse>(
    '/api/career/departments',
    { locale },
    signal
  );
}

export function fetchCareerFeaturedApi(
  filters: TCareerFeaturedFilters,
  signal?: AbortSignal
) {
  return get<ICareerFeaturedResponse>(
    '/api/career/featured',
    {
      slug: filters.slug,
      locale: filters.locale,
      filterBy: filters.filterBy,
    },
    signal
  );
}
