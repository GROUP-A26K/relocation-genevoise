import { dehydrate } from '@tanstack/react-query';

import { makeQueryClient } from '@/libs/queryClient';

import { qkProperty } from './property.queries';
import {
  fetchProperties,
  fetchPropertyCategories,
  getPropertyDetail,
  getPropertyPhotoTour,
} from './property.service';

import type { IPropertiesResponse } from '@/types';
import type {
  TPropertyListFilters,
  IPropertyCategoriesResponse,
} from './property.types';

const ignore = () => undefined;

export async function hydratePropertyList(filters: TPropertyListFilters) {
  const queryClient = makeQueryClient();

  await Promise.all([
    queryClient
      .query({
        queryKey: qkProperty.categories(filters.locale ?? 'fr'),
        queryFn: async () => ({
          categories: await fetchPropertyCategories({
            locale: filters.locale ?? 'fr',
          }),
        }),
      })
      .catch(ignore),
    queryClient.query({
      queryKey: qkProperty.list(filters),
      queryFn: () => fetchProperties(filters),
    }),
  ]);

  return {
    state: dehydrate(queryClient),
    categories: queryClient.getQueryData<IPropertyCategoriesResponse>(
      qkProperty.categories(filters.locale ?? 'fr')
    ) ?? { categories: [] },
    propertyList: queryClient.getQueryData<IPropertiesResponse>(
      qkProperty.list(filters)
    ) ?? {
      properties: [],
      meta: {
        pagination: {
          total: 0,
          page: filters.page ?? 1,
          pageSize: filters.pageSize ?? 12,
          pageCount: 0,
        },
      },
    },
  };
}

export async function hydratePropertyDetail(slug: string, locale: string) {
  const queryClient = makeQueryClient();
  const property = await getPropertyDetail(slug, locale);
  const relatedFilters: TPropertyListFilters = {
    page: 1,
    pageSize: 3,
    locale,
    category: property?.category?.categoryName
      ? [property.category.categoryName]
      : [],
  };

  queryClient.setQueryData(qkProperty.detail(slug, locale), property);

  await queryClient
    .query({
      queryKey: qkProperty.list(relatedFilters),
      queryFn: () => fetchProperties(relatedFilters),
    })
    .catch(ignore);

  return {
    state: dehydrate(queryClient),
    property,
    relatedProperties: queryClient.getQueryData<IPropertiesResponse>(
      qkProperty.list(relatedFilters)
    ) ?? {
      properties: [],
      meta: { pagination: { total: 0, page: 1, pageSize: 3, pageCount: 0 } },
    },
  };
}

export async function hydratePropertyPhotoTour(slug: string, locale: string) {
  const queryClient = makeQueryClient();
  const areas = await getPropertyPhotoTour(slug, locale);

  queryClient.setQueryData(qkProperty.photoTour(slug, locale), { areas });

  return { state: dehydrate(queryClient), areas };
}
