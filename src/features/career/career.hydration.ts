import { dehydrate } from '@tanstack/react-query';

import { makeQueryClient } from '@/libs/queryClient';

import { qkCareer } from './career.queries';
import {
  fetchDepartments,
  fetchFeaturedJobPosts,
  fetchJobDetailBySlug,
  fetchJobPosts,
} from './career.service';

import type {
  CareerFeaturedFilters,
  CareerListFilters,
  CareerDepartmentsResponse,
  CareerFeaturedResponse,
  CareerListResponse,
} from './career.types';

const ignore = () => undefined;

export async function hydrateCareerList(filters: CareerListFilters) {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient
      .query({
        queryKey: qkCareer.departments(filters.locale),
        queryFn: () => fetchDepartments({ locale: filters.locale }),
      })
      .catch(ignore),
    queryClient.query({
      queryKey: qkCareer.list(filters),
      queryFn: () => fetchJobPosts(filters),
    }),
  ]);

  return {
    state: dehydrate(queryClient),
    departments: queryClient.getQueryData<CareerDepartmentsResponse>(
      qkCareer.departments(filters.locale)
    ) ?? { departments: [] },
    careerList: queryClient.getQueryData<CareerListResponse>(
      qkCareer.list(filters)
    ) ?? {
      jobs: [],
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

export async function hydrateCareerDetail(
  slug: string,
  locale: string,
  featured?: CareerFeaturedFilters
) {
  const queryClient = makeQueryClient();
  const detail = await fetchJobDetailBySlug(slug, locale);
  const featuredFilters =
    featured ??
    (detail ? { slug, locale, filterBy: detail.department } : undefined);

  queryClient.setQueryData(qkCareer.detail(slug, locale), detail);

  if (featuredFilters) {
    await queryClient
      .query({
        queryKey: qkCareer.featured(featuredFilters),
        queryFn: () =>
          fetchFeaturedJobPosts(featuredFilters.slug, featuredFilters),
      })
      .catch(ignore);
  }

  return {
    state: dehydrate(queryClient),
    detail: detail,
    featuredJobs: featuredFilters
      ? (queryClient.getQueryData<CareerFeaturedResponse>(
          qkCareer.featured(featuredFilters)
        ) ?? { jobs: [] })
      : { jobs: [] },
  };
}
