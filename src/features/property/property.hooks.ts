'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  propertyCategoriesQueryOptions,
  propertyDetailQueryOptions,
  propertyListQueryOptions,
  propertyPhotoTourQueryOptions,
} from './property.queries';

import type { TPropertyListFilters } from './property.types';

export const usePropertyList = (filters: TPropertyListFilters) =>
  useQuery({
    ...propertyListQueryOptions(filters),
    placeholderData: keepPreviousData,
  });

export const usePropertyCategories = (locale: string) =>
  useQuery(propertyCategoriesQueryOptions(locale));

export const usePropertyDetail = (slug: string, locale: string) =>
  useQuery(propertyDetailQueryOptions(slug, locale));

export const usePropertyPhotoTour = (slug: string, locale: string) =>
  useQuery(propertyPhotoTourQueryOptions(slug, locale));
