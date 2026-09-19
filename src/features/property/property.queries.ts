import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

import {
  fetchPropertiesApi,
  fetchPropertyCategoriesApi,
  fetchPropertyDetailApi,
  fetchPropertyPhotoTourApi,
} from './property.api';

import type {
  IPropertiesResponse,
  IPropertyCategoriesResponse,
  IPropertyDetail,
  TPropertyListFilters,
  IPropertyPhotoTourResponse,
} from './property.types';

const normalizePropertyFilters = (filters: TPropertyListFilters) => ({
  page: filters.page ?? 1,
  pageSize: filters.pageSize ?? 12,
  locale: filters.locale ?? 'fr',
  category: [...(filters.category ?? [])].filter(Boolean).sort(),
  location: filters.location ?? '',
  minPrice: filters.minPrice ?? 0,
  maxPrice: filters.maxPrice ?? 0,
  currency: filters.currency ?? 'CHF',
  sort: filters.sort ?? 'newest',
  rooms: filters.rooms ?? '',
  availableOnly: filters.availableOnly ?? false,
});

export const qkProperty = {
  root: ['property'] as const,
  lists: () => [...qkProperty.root, 'list'] as const,
  list: (filters: TPropertyListFilters) =>
    [...qkProperty.lists(), normalizePropertyFilters(filters)] as const,
  details: () => [...qkProperty.root, 'detail'] as const,
  detail: (slug: string, locale: string) =>
    [...qkProperty.details(), { slug, locale }] as const,
  categories: (locale: string) =>
    [...qkProperty.root, 'categories', { locale }] as const,
  photoTour: (slug: string, locale: string) =>
    [...qkProperty.root, 'photo-tour', { slug, locale }] as const,
};

type TPropertyQueryContext = QueryFunctionContext<readonly unknown[]>;

export const propertyListQueryOptions = (filters: TPropertyListFilters) =>
  queryOptions<IPropertiesResponse>({
    queryKey: qkProperty.list(filters),
    queryFn: ({ signal }: TPropertyQueryContext) =>
      fetchPropertiesApi(normalizePropertyFilters(filters), signal),
  });

export const propertyCategoriesQueryOptions = (locale: string) =>
  queryOptions<IPropertyCategoriesResponse>({
    queryKey: qkProperty.categories(locale),
    queryFn: ({ signal }: TPropertyQueryContext) =>
      fetchPropertyCategoriesApi(locale, signal),
  });

export const propertyDetailQueryOptions = (slug: string, locale: string) =>
  queryOptions<IPropertyDetail | null>({
    queryKey: qkProperty.detail(slug, locale),
    queryFn: ({ signal }: TPropertyQueryContext) =>
      fetchPropertyDetailApi(slug, locale, signal),
  });

export const propertyPhotoTourQueryOptions = (slug: string, locale: string) =>
  queryOptions<IPropertyPhotoTourResponse>({
    queryKey: qkProperty.photoTour(slug, locale),
    queryFn: ({ signal }: TPropertyQueryContext) =>
      fetchPropertyPhotoTourApi(slug, locale, signal),
  });
