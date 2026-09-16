import { get } from '@/libs/axios';

import type {
  IPropertiesResponse,
  PropertyCategoriesResponse,
  PropertyDetail,
  PropertyListFilters,
  PropertyPhotoTourResponse,
} from './property.types';

export function fetchPropertiesApi(
  filters: PropertyListFilters,
  signal?: AbortSignal
) {
  return get<IPropertiesResponse>(
    '/api/property',
    {
      locale: filters.locale,
      page: filters.page,
      pageSize: filters.pageSize,
      category: (filters.category ?? []).join(','),
      location: filters.location,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      currency: filters.currency,
      sort: filters.sort,
      rooms: filters.rooms,
      availableOnly: filters.availableOnly,
    },
    signal
  );
}

export function fetchPropertyCategoriesApi(
  locale: string,
  signal?: AbortSignal
) {
  return get<PropertyCategoriesResponse>(
    '/api/property/categories',
    { locale },
    signal
  );
}

export function fetchPropertyDetailApi(
  slug: string,
  locale: string,
  signal?: AbortSignal
) {
  return get<PropertyDetail | null>(
    '/api/property/detail',
    { slug, locale },
    signal
  );
}

export function fetchPropertyPhotoTourApi(
  slug: string,
  locale: string,
  signal?: AbortSignal
) {
  return get<PropertyPhotoTourResponse>(
    '/api/property/photo-tour',
    { slug, locale },
    signal
  );
}
