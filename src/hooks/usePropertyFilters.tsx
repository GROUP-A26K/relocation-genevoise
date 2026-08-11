"use client";

import { useCallback, useMemo, type TransitionStartFunction } from "react";
import {
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from "nuqs";

import {
  PROPERTY_DEFAULT_CURRENCY,
  toCHF as toCHFStatic,
} from "@/constants/property";
import {
  buildPropertyFilterParams,
  categoriesToParam,
  INITIAL_PROPERTY_QUERY_PARAMS as INITIAL_PARAMS,
  paramToCategories,
} from "@/utils/propertyFilters";

export {
  PROPERTY_PAGE_SIZE,
  type IPropertyFilterQueryParams,
} from "@/utils/propertyFilters";

type PropertyAppliedFilters = {
  categories: string[];
  location: string;
  priceRange: string;
  currency: string;
  rooms: string;
};

export type PropertyFilterFormValues = {
  categories: string[];
  location: string;
  priceRange: string;
  currency: string;
  rooms: string;
};

export const PROPERTY_SORT_OPTIONS = [
  { value: "newest", labelKey: "sort.newest" },
  { value: "price_asc", labelKey: "sort.priceAsc" },
  { value: "price_desc", labelKey: "sort.priceDesc" },
] as const;

export const usePropertyFilters = (
  convertToCHF?: (amount: number, currency: string) => number,
  startTransition?: TransitionStartFunction,
) => {
  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(INITIAL_PARAMS.page),
      categories: parseAsString.withDefault(INITIAL_PARAMS.categories),
      location: parseAsString.withDefault(INITIAL_PARAMS.location),
      priceRange: parseAsString.withDefault(INITIAL_PARAMS.priceRange),
      currency: parseAsString.withDefault(INITIAL_PARAMS.currency),
      sort: parseAsString.withDefault(INITIAL_PARAMS.sort),
      rooms: parseAsString.withDefault(INITIAL_PARAMS.rooms),
      availableOnly: parseAsBoolean.withDefault(INITIAL_PARAMS.availableOnly),
    },
    { shallow: false, scroll: false, startTransition },
  );

  const formValues = useMemo<PropertyFilterFormValues>(
    () => ({
      location: queryParams.location,
      categories: paramToCategories(queryParams.categories),
      priceRange: queryParams.priceRange,
      currency: queryParams.currency || PROPERTY_DEFAULT_CURRENCY,
      rooms: queryParams.rooms,
    }),
    [
      queryParams.categories,
      queryParams.currency,
      queryParams.location,
      queryParams.priceRange,
      queryParams.rooms,
    ],
  );

  const applyFilters = useCallback(
    (filters: Partial<PropertyAppliedFilters> = {}) => {
      const nextLocation = (filters.location ?? queryParams.location).trim();
      const nextCategories =
        filters.categories !== undefined
          ? categoriesToParam(filters.categories)
          : queryParams.categories;
      const nextPriceRange = filters.priceRange ?? queryParams.priceRange;
      const nextCurrency =
        filters.currency ?? queryParams.currency ?? PROPERTY_DEFAULT_CURRENCY;
      const nextRooms = filters.rooms ?? queryParams.rooms;

      void setQueryParams({
        page: 1,
        location: nextLocation,
        categories: nextCategories,
        priceRange: nextPriceRange,
        currency: nextCurrency,
        rooms: nextRooms,
      });
    },
    [
      queryParams.categories,
      queryParams.currency,
      queryParams.location,
      queryParams.priceRange,
      queryParams.rooms,
      setQueryParams,
    ],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      void setQueryParams({ page });
    },
    [setQueryParams],
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      void setQueryParams({ sort, page: 1 });
    },
    [setQueryParams],
  );

  const handleAvailableOnlyChange = useCallback(
    (availableOnly: boolean) => {
      void setQueryParams({ availableOnly, page: 1 });
    },
    [setQueryParams],
  );

  const filterParams = useMemo(
    () => buildPropertyFilterParams(queryParams, convertToCHF ?? toCHFStatic),
    [queryParams, convertToCHF],
  );

  return {
    queryParams,
    formValues,
    setQueryParams,
    handlePageChange,
    handleSortChange,
    handleAvailableOnlyChange,
    applyFilters,
    filterParams,
  };
};
