import {
  PROPERTY_DEFAULT_CURRENCY,
  getPriceRangeByValue,
} from "@/constants/property";
import type { IPropertyParams } from "@/types";

export interface IPropertyFilterQueryParams {
  page: number;
  categories: string;
  location: string;
  priceRange: string;
  currency: string;
  sort: string;
  rooms: string;
  availableOnly: boolean;
}

export const PROPERTY_PAGE_SIZE = 12;

export const INITIAL_PROPERTY_QUERY_PARAMS: IPropertyFilterQueryParams = {
  page: 1,
  categories: "",
  location: "",
  priceRange: "",
  currency: PROPERTY_DEFAULT_CURRENCY,
  sort: "newest",
  rooms: "",
  availableOnly: false,
};

export const categoriesToParam = (categories: string[]): string =>
  categories.filter(Boolean).join(",");

export const paramToCategories = (param: string): string[] =>
  param ? param.split(",").filter(Boolean) : [];

export const buildPropertyFilterParams = (
  query: IPropertyFilterQueryParams,
  toCHF: (amount: number, currency: string) => number,
): IPropertyParams => {
  const range = getPriceRangeByValue(query.priceRange);
  const currency = query.currency || PROPERTY_DEFAULT_CURRENCY;

  return {
    page: query.page,
    pageSize: PROPERTY_PAGE_SIZE,
    category: paramToCategories(query.categories),
    location: query.location ? `*${query.location}*` : "",
    minPrice: range.min > 0 ? toCHF(range.min, currency) : 0,
    maxPrice: range.max > 0 ? toCHF(range.max, currency) : 0,
    currency,
    sort: query.sort,
    rooms: query.rooms,
    availableOnly: query.availableOnly,
  };
};

export const parsePropertySearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
): IPropertyFilterQueryParams => {
  const read = (key: keyof IPropertyFilterQueryParams): string => {
    const value = searchParams[key];
    return (Array.isArray(value) ? value[0] : value) ?? "";
  };

  return {
    page: Number(read("page")) || INITIAL_PROPERTY_QUERY_PARAMS.page,
    categories: read("categories"),
    location: read("location"),
    priceRange: read("priceRange"),
    currency: read("currency") || PROPERTY_DEFAULT_CURRENCY,
    sort: read("sort") || INITIAL_PROPERTY_QUERY_PARAMS.sort,
    rooms: read("rooms"),
    availableOnly: read("availableOnly") === "true",
  };
};
