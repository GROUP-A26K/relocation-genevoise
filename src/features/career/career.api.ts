import { get } from '@/libs/axios';

import type {
  CareerDepartmentsResponse,
  CareerFeaturedFilters,
  CareerFeaturedResponse,
  CareerListFilters,
  CareerListResponse,
  JobDetail,
} from './career.types';

export function fetchCareerListApi(
  filters: CareerListFilters,
  signal?: AbortSignal
) {
  return get<CareerListResponse>(
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
  return get<JobDetail | null>('/api/career/detail', { slug, locale }, signal);
}

export function fetchCareerDepartmentsApi(
  locale: string,
  signal?: AbortSignal
) {
  return get<CareerDepartmentsResponse>(
    '/api/career/departments',
    { locale },
    signal
  );
}

export function fetchCareerFeaturedApi(
  filters: CareerFeaturedFilters,
  signal?: AbortSignal
) {
  return get<CareerFeaturedResponse>(
    '/api/career/featured',
    {
      slug: filters.slug,
      locale: filters.locale,
      filterBy: filters.filterBy,
    },
    signal
  );
}
