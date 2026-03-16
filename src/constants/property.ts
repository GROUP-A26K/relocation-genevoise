import { PropertyPriceUnit, PropertyRentPeriod } from "@/models/Property";

export const PROPERTY_SORT = {
  newest: "newest",
  priceAsc: "price_asc",
  priceDesc: "price_desc",
} as const;

export type TPropertySort = (typeof PROPERTY_SORT)[keyof typeof PROPERTY_SORT];

export const PROPERTY_CURRENCY = {
  usd: "USD",
  eur: "EUR",
  chf: "CHF",
} as const;

export type TPropertyCurrency =
  (typeof PROPERTY_CURRENCY)[keyof typeof PROPERTY_CURRENCY];

export const PROPERTY_PRICE_UNIT = {
  usd: "$",
  eur: "EUR",
  chf: "CHF",
} as const satisfies Record<keyof typeof PROPERTY_CURRENCY, PropertyPriceUnit>;

export const PROPERTY_RENT_PERIOD = {
  month: "month",
  year: "year",
} as const satisfies Record<"month" | "year", PropertyRentPeriod>;

export const PROPERTY_DEFAULT_SORT = PROPERTY_SORT.newest;
export const PROPERTY_DEFAULT_PRICE_UNIT = PROPERTY_PRICE_UNIT.usd;
export const PROPERTY_DEFAULT_RENT_PERIOD = PROPERTY_RENT_PERIOD.month;

export const PROPERTY_CURRENCY_TO_PRICE_UNIT: Record<
  TPropertyCurrency,
  PropertyPriceUnit
> = {
  [PROPERTY_CURRENCY.usd]: PROPERTY_PRICE_UNIT.usd,
  [PROPERTY_CURRENCY.eur]: PROPERTY_PRICE_UNIT.eur,
  [PROPERTY_CURRENCY.chf]: PROPERTY_PRICE_UNIT.chf,
};
