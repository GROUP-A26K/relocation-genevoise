'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  careerDepartmentsQueryOptions,
  careerDetailQueryOptions,
  careerFeaturedQueryOptions,
  careerListQueryOptions,
} from './career.queries';

import type {
  TCareerFeaturedFilters,
  TCareerListFilters,
} from './career.types';

export const useCareerList = (filters: TCareerListFilters) =>
  useQuery({
    ...careerListQueryOptions(filters),
    placeholderData: keepPreviousData,
  });

export const useCareerDetail = (slug: string, locale: string) =>
  useQuery(careerDetailQueryOptions(slug, locale));

export const useCareerDepartments = (locale: string) =>
  useQuery(careerDepartmentsQueryOptions(locale));

export const useCareerFeatured = (filters: TCareerFeaturedFilters) =>
  useQuery(careerFeaturedQueryOptions(filters));
