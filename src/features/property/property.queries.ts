import { queryOptions, type QueryFunctionContext } from '@tanstack/react-query';

import {
  fetchPropertiesApi,
  fetchPropertyCategoriesApi,
  fetchPropertyDetailApi,
  fetchPropertyPhotoTourApi,
} from './property.api';

import type {
  IPropertiesResponse,
  PropertyCategoriesResponse,
  PropertyDetail,
  PropertyListFilters,
  PropertyPhotoTourResponse,
} from './property.types';

const normalizePropertyFilters = (filters: PropertyListFilters) => ({
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
  list: (filters: PropertyListFilters) =>
    [...qkProperty.lists(), normalizePropertyFilters(filters)] as const,
  details: () => [...qkProperty.root, 'detail'] as const,
  detail: (slug: string, locale: string) =>
    [...qkProperty.details(), { slug, locale }] as const,
  categories: (locale: string) =>
    [...qkProperty.root, 'categories', { locale }] as const,
  photoTour: (slug: string, locale: string) =>
    [...qkProperty.root, 'photo-tour', { slug, locale }] as const,
};

type PropertyQueryContext = QueryFunctionContext<readonly unknown[]>;

export const propertyListQueryOptions = (filters: PropertyListFilters) =>
  queryOptions<IPropertiesResponse>({
    queryKey: qkProperty.list(filters),
    queryFn: ({ signal }: PropertyQueryContext) =>
      fetchPropertiesApi(normalizePropertyFilters(filters), signal),
  });

export const propertyCategoriesQueryOptions = (locale: string) =>
  queryOptions<PropertyCategoriesResponse>({
    queryKey: qkProperty.categories(locale),
    queryFn: ({ signal }: PropertyQueryContext) =>
      fetchPropertyCategoriesApi(locale, signal),
  });

export const propertyDetailQueryOptions = (slug: string, locale: string) =>
  queryOptions<PropertyDetail | null>({
    queryKey: qkProperty.detail(slug, locale),
    queryFn: ({ signal }: PropertyQueryContext) =>
      fetchPropertyDetailApi(slug, locale, signal),
  });

export const propertyPhotoTourQueryOptions = (slug: string, locale: string) =>
  queryOptions<PropertyPhotoTourResponse>({
    queryKey: qkProperty.photoTour(slug, locale),
    queryFn: ({ signal }: PropertyQueryContext) =>
      fetchPropertyPhotoTourApi(slug, locale, signal),
  });
