"use client";

import { useCallback, useMemo } from "react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export interface IPropertyFilterQueryParams {
  page: number;
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  currency: string;
  sort: string;
}

type PropertyAppliedFilters = {
  category: string;
  location: string;
  minPrice: string | number;
  maxPrice: string | number;
  currency: string;
};

export type PropertyFilterFormValues = {
  category: string;
  location: string;
  minPrice: string;
  maxPrice: string;
  currency: string;
};

const INITIAL_PARAMS: IPropertyFilterQueryParams = {
  page: 1,
  category: "",
  location: "",
  minPrice: 0,
  maxPrice: 0,
  currency: "",
  sort: "newest",
};

export const PROPERTY_PAGE_SIZE = 12;

export const PROPERTY_SORT_OPTIONS = [
  { value: "newest", labelKey: "sort.newest" },
  { value: "price_asc", labelKey: "sort.priceAsc" },
  { value: "price_desc", labelKey: "sort.priceDesc" },
] as const;

const toPriceInputValue = (value: number) => (value > 0 ? String(value) : "");

const toPriceParam = (value: string | number) => {
  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : 0;
};

export const usePropertyFilters = () => {
  const [queryParams, setQueryParams] = useQueryStates(
    {
      page: parseAsInteger.withDefault(INITIAL_PARAMS.page),
      category: parseAsString.withDefault(INITIAL_PARAMS.category),
      location: parseAsString.withDefault(INITIAL_PARAMS.location),
      minPrice: parseAsInteger.withDefault(INITIAL_PARAMS.minPrice),
      maxPrice: parseAsInteger.withDefault(INITIAL_PARAMS.maxPrice),
      currency: parseAsString.withDefault(INITIAL_PARAMS.currency),
      sort: parseAsString.withDefault(INITIAL_PARAMS.sort),
    },
    { shallow: false, scroll: false },
  );

  const formValues = useMemo<PropertyFilterFormValues>(
    () => ({
      location: queryParams.location,
      category: queryParams.category,
      minPrice: toPriceInputValue(queryParams.minPrice),
      maxPrice: toPriceInputValue(queryParams.maxPrice),
      currency: queryParams.currency,
    }),
    [
      queryParams.category,
      queryParams.currency,
      queryParams.location,
      queryParams.maxPrice,
      queryParams.minPrice,
    ],
  );

  const handleFilterChange = useCallback(
    (
      key: keyof Omit<IPropertyFilterQueryParams, "page" | "sort">,
      value: string | number,
    ) => {
      const normalizedValue =
        key === "minPrice" || key === "maxPrice" ? toPriceParam(value) : value;

      void setQueryParams({
        [key]: normalizedValue,
        page: 1,
      } as Partial<IPropertyFilterQueryParams>);
    },
    [setQueryParams],
  );

  const applyFilters = useCallback(
    (filters: Partial<PropertyAppliedFilters> = {}) => {
      const nextLocation = (filters.location ?? queryParams.location).trim();
      const nextCategory = filters.category ?? queryParams.category;
      const nextMinPrice = toPriceParam(
        filters.minPrice ?? queryParams.minPrice,
      );
      const nextMaxPrice = toPriceParam(
        filters.maxPrice ?? queryParams.maxPrice,
      );
      const nextCurrency = filters.currency ?? queryParams.currency;

      void setQueryParams({
        page: 1,
        location: nextLocation,
        category: nextCategory,
        minPrice: nextMinPrice,
        maxPrice: nextMaxPrice,
        currency: nextCurrency,
      });
    },
    [
      queryParams.category,
      queryParams.currency,
      queryParams.location,
      queryParams.maxPrice,
      queryParams.minPrice,
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

  const filterParams = useMemo(
    () => ({
      page: queryParams.page,
      pageSize: PROPERTY_PAGE_SIZE,
      category: queryParams.category,
      location: queryParams.location ? `*${queryParams.location}*` : "",
      minPrice: queryParams.minPrice,
      maxPrice: queryParams.maxPrice,
      currency: queryParams.currency,
      sort: queryParams.sort,
    }),
    [
      queryParams.category,
      queryParams.currency,
      queryParams.location,
      queryParams.maxPrice,
      queryParams.minPrice,
      queryParams.page,
      queryParams.sort,
    ],
  );

  return {
    queryParams,
    formValues,
    setQueryParams,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
    applyFilters,
    filterParams,
  };
};
