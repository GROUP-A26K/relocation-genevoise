import { PropertyPriceUnit, PropertyRentPeriod } from "@/models/Property";

export const PROPERTY_SORT = {
  newest: "newest",
  priceAsc: "price_asc",
  priceDesc: "price_desc",
} as const;

export type TPropertySort = (typeof PROPERTY_SORT)[keyof typeof PROPERTY_SORT];

export const PROPERTY_CURRENCY = {
  chf: "CHF",
  eur: "EUR",
  usd: "USD",
} as const;

export type TPropertyCurrency =
  (typeof PROPERTY_CURRENCY)[keyof typeof PROPERTY_CURRENCY];

export const PROPERTY_PRICE_UNIT = {
  chf: "CHF",
} as const satisfies Record<"chf", PropertyPriceUnit>;

export const PROPERTY_RENT_PERIOD = {
  month: "month",
  year: "year",
} as const satisfies Record<"month" | "year", PropertyRentPeriod>;

export const PROPERTY_DEFAULT_SORT = PROPERTY_SORT.newest;
export const PROPERTY_DEFAULT_PRICE_UNIT: PropertyPriceUnit = "CHF";
export const PROPERTY_DEFAULT_RENT_PERIOD = PROPERTY_RENT_PERIOD.month;
export const PROPERTY_DEFAULT_CURRENCY = PROPERTY_CURRENCY.chf;

// Exchange rates: 1 CHF = X units of target currency
export const CURRENCIES = [
  { value: "CHF", symbol: "CHF", rate: 1 },
  { value: "EUR", symbol: "€", rate: 0.95 },
  { value: "USD", symbol: "$", rate: 1.12 },
] as const;

export type TCurrency = (typeof CURRENCIES)[number];

/** Convert from display currency amount to CHF (for Sanity queries) */
export const toCHF = (amount: number, currencyValue: string): number => {
  const currency = CURRENCIES.find((c) => c.value === currencyValue);
  if (!currency) return amount;
  return Math.round(amount / currency.rate);
};

/** Convert from CHF to display currency (for UI display) */
export const fromCHF = (amount: number, currencyValue: string): number => {
  const currency = CURRENCIES.find((c) => c.value === currencyValue);
  if (!currency) return amount;
  return Math.round(amount * currency.rate);
};

// Preset price range options (values are in the selected display currency)
export const PRICE_RANGE_OPTIONS = [
  { value: "", min: 0, max: 0, labelKey: "filters.anyPrice" },
  { value: "under_1500", min: 0, max: 1500, labelKey: "filters.under1500" },
  {
    value: "1500_2500",
    min: 1500,
    max: 2500,
    labelKey: "filters.range1500to2500",
  },
  {
    value: "2500_3000",
    min: 2500,
    max: 3000,
    labelKey: "filters.range2500to3000",
  },
  {
    value: "3000_5000",
    min: 3000,
    max: 5000,
    labelKey: "filters.range3000to5000",
  },
  { value: "5000_plus", min: 5000, max: 0, labelKey: "filters.range5000plus" },
] as const;

export type TPriceRange = (typeof PRICE_RANGE_OPTIONS)[number]["value"];

export const getPriceRangeByValue = (value: string) =>
  PRICE_RANGE_OPTIONS.find((o) => o.value === value) ?? PRICE_RANGE_OPTIONS[0];
