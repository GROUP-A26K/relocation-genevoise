"use client";

import { useCallback, useMemo } from "react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

import {
  PROPERTY_DEFAULT_CURRENCY,
  getPriceRangeByValue,
  toCHF as toCHFStatic,
} from "@/constants/property";

export interface IPropertyFilterQueryParams {
  page: number;
  categories: string;
  location: string;
  priceRange: string;
  currency: string;
  sort: string;
}

type PropertyAppliedFilters = {
  categories: string[];
  location: string;
  priceRange: string;
  currency: string;
};

export type PropertyFilterFormValues = {
  categories: string[];
  location: string;
  priceRange: string;
  currency: string;
};

const INITIAL_PARAMS: IPropertyFilterQueryParams = {
  page: 1,
  categories: "",
  location: "",
  priceRange: "",
  currency: PROPERTY_DEFAULT_CURRENCY,
  sort: "newest",
};

export const PROPERTY_PAGE_SIZE = 12;

export const PROPERTY_SORT_OPTIONS = [
  { value: "newest", labelKey: "sort.newest" },
  { value: "price_asc", labelKey: "sort.priceAsc" },
  { value: "price_desc", labelKey: "sort.priceDesc" },
] as const;

const categoriesToParam = (categories: string[]): string =>
  categories.filter(Boolean).join(",");

const paramToCategories = (param: string): string[] =>
  param ? param.split(",").filter(Boolean) : [];

export const usePropertyFilters = (
  convertToCHF?: (amount: number, currency: string) => number,
) => {
  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(INITIAL_PARAMS.page),
      categories: parseAsString.withDefault(INITIAL_PARAMS.categories),
      location: parseAsString.withDefault(INITIAL_PARAMS.location),
      priceRange: parseAsString.withDefault(INITIAL_PARAMS.priceRange),
      currency: parseAsString.withDefault(INITIAL_PARAMS.currency),
      sort: parseAsString.withDefault(INITIAL_PARAMS.sort),
    },
    { shallow: false, scroll: false },
  );

  const formValues = useMemo<PropertyFilterFormValues>(
    () => ({
      location: queryParams.location,
      categories: paramToCategories(queryParams.categories),
      priceRange: queryParams.priceRange,
      currency: queryParams.currency || PROPERTY_DEFAULT_CURRENCY,
    }),
    [
      queryParams.categories,
      queryParams.currency,
      queryParams.location,
      queryParams.priceRange,
    ],
  );

  const applyFilters = useCallback(
    (filters: Partial<PropertyAppliedFilters> = {}) => {
      const nextLocation = (
        filters.location ?? queryParams.location
      ).trim();
      const nextCategories =
        filters.categories !== undefined
          ? categoriesToParam(filters.categories)
          : queryParams.categories;
      const nextPriceRange = filters.priceRange ?? queryParams.priceRange;
      const nextCurrency =
        filters.currency ?? queryParams.currency ?? PROPERTY_DEFAULT_CURRENCY;

      void setQueryParams({
        page: 1,
        location: nextLocation,
        categories: nextCategories,
        priceRange: nextPriceRange,
        currency: nextCurrency,
      });
    },
    [
      queryParams.categories,
      queryParams.currency,
      queryParams.location,
      queryParams.priceRange,
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

  // Convert price range + currency into CHF min/max for Sanity query
  const filterParams = useMemo(() => {
    const range = getPriceRangeByValue(queryParams.priceRange);
    const currency =
      queryParams.currency || PROPERTY_DEFAULT_CURRENCY;

    const converter = convertToCHF ?? toCHFStatic;
    const minPriceCHF = range.min > 0 ? converter(range.min, currency) : 0;
    const maxPriceCHF = range.max > 0 ? converter(range.max, currency) : 0;

    return {
      page: queryParams.page,
      pageSize: PROPERTY_PAGE_SIZE,
      category: paramToCategories(queryParams.categories),
      location: queryParams.location ? `*${queryParams.location}*` : "",
      minPrice: minPriceCHF,
      maxPrice: maxPriceCHF,
      currency: queryParams.currency || PROPERTY_DEFAULT_CURRENCY,
      sort: queryParams.sort,
    };
  }, [
    queryParams.categories,
    queryParams.currency,
    queryParams.location,
    queryParams.page,
    queryParams.priceRange,
    queryParams.sort,
  ]);

  return {
    queryParams,
    formValues,
    setQueryParams,
    handlePageChange,
    handleSortChange,
    applyFilters,
    filterParams,
  };
};
