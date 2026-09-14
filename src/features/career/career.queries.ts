import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

import {
  fetchCareerDepartmentsApi,
  fetchCareerDetailApi,
  fetchCareerFeaturedApi,
  fetchCareerListApi,
} from './career.api';

import type {
  CareerDepartmentsResponse,
  CareerFeaturedFilters,
  CareerFeaturedResponse,
  CareerListFilters,
  CareerListResponse,
  JobDetail,
} from './career.types';

export const qkCareer = {
  root: ['career'] as const,
  lists: () => [...qkCareer.root, 'list'] as const,
  list: (filters: CareerListFilters) => [...qkCareer.lists(), filters] as const,
  details: () => [...qkCareer.root, 'detail'] as const,
  detail: (slug: string, locale: string) =>
    [...qkCareer.details(), { slug, locale }] as const,
  departments: (locale: string) =>
    [...qkCareer.root, 'departments', { locale }] as const,
  featured: (filters: CareerFeaturedFilters) =>
    [...qkCareer.root, 'featured', filters] as const,
};

type CareerQueryContext = QueryFunctionContext<readonly unknown[]>;

export const careerListQueryOptions = (filters: CareerListFilters) =>
  queryOptions<CareerListResponse>({
    queryKey: qkCareer.list(filters),
    queryFn: ({ signal }: CareerQueryContext) =>
      fetchCareerListApi(filters, signal),
  });

export const careerDetailQueryOptions = (slug: string, locale: string) =>
  queryOptions<JobDetail | null>({
    queryKey: qkCareer.detail(slug, locale),
    queryFn: ({ signal }: CareerQueryContext) =>
      fetchCareerDetailApi(slug, locale, signal),
  });

export const careerDepartmentsQueryOptions = (locale: string) =>
  queryOptions<CareerDepartmentsResponse>({
    queryKey: qkCareer.departments(locale),
    queryFn: ({ signal }: CareerQueryContext) =>
      fetchCareerDepartmentsApi(locale, signal),
  });

export const careerFeaturedQueryOptions = (filters: CareerFeaturedFilters) =>
  queryOptions<CareerFeaturedResponse>({
    queryKey: qkCareer.featured(filters),
    queryFn: ({ signal }: CareerQueryContext) =>
      fetchCareerFeaturedApi(filters, signal),
  });
