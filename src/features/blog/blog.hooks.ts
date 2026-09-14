'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  blogCategoriesQueryOptions,
  blogDetailQueryOptions,
  blogLatestQueryOptions,
  blogListQueryOptions,
} from './blog.queries';

import type { BlogListFilters } from './blog.types';

export const useBlogList = (filters: BlogListFilters) =>
  useQuery({
    ...blogListQueryOptions(filters),
    placeholderData: keepPreviousData,
  });

export const useBlogDetail = (slug: string, locale: string) =>
  useQuery(blogDetailQueryOptions(slug, locale));

export const useLatestBlog = (locale: string) =>
  useQuery(blogLatestQueryOptions(locale));

export const useBlogCategories = (locale: string) =>
  useQuery(blogCategoriesQueryOptions(locale));
