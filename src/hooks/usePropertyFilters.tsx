"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export interface PropertyFilterQueryParams {
  page: number;
  category: string;
  location: string;
  minPrice: number;
  maxPrice: number;
  sort: string;
}

type PropertyAppliedFilters = {
  category: string;
  location: string;
  minPrice: string | number;
  maxPrice: string | number;
};

const INITIAL_PARAMS: PropertyFilterQueryParams = {
  page: 1,
  category: "",
  location: "",
  minPrice: 0,
  maxPrice: 0,
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
      sort: parseAsString.withDefault(INITIAL_PARAMS.sort),
    },
    { shallow: false, scroll: false }
  );

  const [filterLocation, setFilterLocation] = useState(queryParams.location);
  const [filterCategory, setFilterCategory] = useState(queryParams.category);
  const [filterMinPrice, setFilterMinPrice] = useState(
    toPriceInputValue(queryParams.minPrice)
  );
  const [filterMaxPrice, setFilterMaxPrice] = useState(
    toPriceInputValue(queryParams.maxPrice)
  );

  useEffect(() => {
    setFilterLocation(queryParams.location);
  }, [queryParams.location]);

  useEffect(() => {
    setFilterCategory(queryParams.category);
  }, [queryParams.category]);

  useEffect(() => {
    setFilterMinPrice(toPriceInputValue(queryParams.minPrice));
  }, [queryParams.minPrice]);

  useEffect(() => {
    setFilterMaxPrice(toPriceInputValue(queryParams.maxPrice));
  }, [queryParams.maxPrice]);

  const handleFilterChange = useCallback(
    (
      key: keyof Omit<PropertyFilterQueryParams, "page" | "sort">,
      value: string | number
    ) => {
      const normalizedValue =
        key === "minPrice" || key === "maxPrice" ? toPriceParam(value) : value;

      void setQueryParams({
        [key]: normalizedValue,
        page: 1,
      } as Partial<PropertyFilterQueryParams>);
    },
    [setQueryParams]
  );

  const applyFilters = useCallback((filters?: Partial<PropertyAppliedFilters>) => {
    const nextLocation = (filters?.location ?? filterLocation).trim();
    const nextCategory = filters?.category ?? filterCategory;
    const nextMinPrice = toPriceParam(filters?.minPrice ?? filterMinPrice);
    const nextMaxPrice = toPriceParam(filters?.maxPrice ?? filterMaxPrice);

    void setQueryParams({
      page: 1,
      location: nextLocation,
      category: nextCategory,
      minPrice: nextMinPrice,
      maxPrice: nextMaxPrice,
    });
  }, [filterCategory, filterLocation, filterMaxPrice, filterMinPrice, setQueryParams]);

  const handlePageChange = useCallback(
    (page: number) => {
      void setQueryParams({ page });
    },
    [setQueryParams]
  );

  const handleSortChange = useCallback(
    (sort: string) => {
      void setQueryParams({ sort, page: 1 });
    },
    [setQueryParams]
  );

  const filterParams = useMemo(
    () => ({
      page: queryParams.page,
      pageSize: PROPERTY_PAGE_SIZE,
      category: queryParams.category,
      location: queryParams.location ? `*${queryParams.location}*` : "",
      minPrice: queryParams.minPrice,
      maxPrice: queryParams.maxPrice,
      sort: queryParams.sort,
    }),
    [
      queryParams.category,
      queryParams.location,
      queryParams.maxPrice,
      queryParams.minPrice,
      queryParams.page,
      queryParams.sort,
    ]
  );

  return {
    queryParams,
    filterLocation,
    filterCategory,
    filterMinPrice,
    filterMaxPrice,
    setQueryParams,
    setFilterLocation,
    setFilterCategory,
    setFilterMinPrice,
    setFilterMaxPrice,
    handleFilterChange,
    handlePageChange,
    handleSortChange,
    applyFilters,
    filterParams,
  };
};
