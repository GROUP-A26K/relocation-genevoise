import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

import {
  fetchCareerDepartmentsApi,
  fetchCareerDetailApi,
  fetchCareerFeaturedApi,
  fetchCareerListApi,
} from './career.api';

import type {
  ICareerDepartmentsResponse,
  TCareerFeaturedFilters,
  ICareerFeaturedResponse,
  TCareerListFilters,
  ICareerListResponse,
  IJobDetail,
} from './career.types';

export const qkCareer = {
  root: ['career'] as const,
  lists: () => [...qkCareer.root, 'list'] as const,
  list: (filters: TCareerListFilters) =>
    [...qkCareer.lists(), filters] as const,
  details: () => [...qkCareer.root, 'detail'] as const,
  detail: (slug: string, locale: string) =>
    [...qkCareer.details(), { slug, locale }] as const,
  departments: (locale: string) =>
    [...qkCareer.root, 'departments', { locale }] as const,
  featured: (filters: TCareerFeaturedFilters) =>
    [...qkCareer.root, 'featured', filters] as const,
};

type TCareerQueryContext = QueryFunctionContext<readonly unknown[]>;

export const careerListQueryOptions = (filters: TCareerListFilters) =>
  queryOptions<ICareerListResponse>({
    queryKey: qkCareer.list(filters),
    queryFn: ({ signal }: TCareerQueryContext) =>
      fetchCareerListApi(filters, signal),
  });

export const careerDetailQueryOptions = (slug: string, locale: string) =>
  queryOptions<IJobDetail | null>({
    queryKey: qkCareer.detail(slug, locale),
    queryFn: ({ signal }: TCareerQueryContext) =>
      fetchCareerDetailApi(slug, locale, signal),
  });

export const careerDepartmentsQueryOptions = (locale: string) =>
  queryOptions<ICareerDepartmentsResponse>({
    queryKey: qkCareer.departments(locale),
    queryFn: ({ signal }: TCareerQueryContext) =>
      fetchCareerDepartmentsApi(locale, signal),
  });

export const careerFeaturedQueryOptions = (filters: TCareerFeaturedFilters) =>
  queryOptions<ICareerFeaturedResponse>({
    queryKey: qkCareer.featured(filters),
    queryFn: ({ signal }: TCareerQueryContext) =>
      fetchCareerFeaturedApi(filters, signal),
  });
