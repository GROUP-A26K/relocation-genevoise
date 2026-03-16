import {
  buildPropertiesQuery,
  PROPERTY_CATEGORIES_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { LOCALE, type TLocale } from "@/constants/locale";
import {
  PROPERTY_CURRENCY_TO_PRICE_UNIT,
  PROPERTY_DEFAULT_PRICE_UNIT,
  PROPERTY_DEFAULT_RENT_PERIOD,
  PROPERTY_DEFAULT_SORT,
  type TPropertyCurrency,
} from "@/constants/property";
import {
  PropertyCategory,
  PropertyFacility,
  PropertyListing,
} from "@/models/Property";
import {
  IPropertiesResponse,
  IPropertyCategoryDocument,
  IPropertyCategoryParams,
  IPropertyParams,
  ISanityPropertyResponse,
} from "@/types";

const DEFAULT_PROPERTY_PAGE = 1;
const DEFAULT_PROPERTY_PAGE_SIZE = 15;
const DEFAULT_PROPERTY_LOCALE = LOCALE.fr;
const EMPTY_PROPERTIES_RESPONSE: IPropertiesResponse = {
  properties: [],
  meta: {
    pagination: {
      total: 0,
      page: 0,
      pageSize: 0,
      pageCount: 0,
    },
  },
};

const toPriceUnitFilter = (currency?: string): string => {
  if (!currency) {
    return "";
  }

  return (
    PROPERTY_CURRENCY_TO_PRICE_UNIT[currency as TPropertyCurrency] ?? currency
  );
};

const getLocale = (locale?: string): TLocale => {
  return locale === LOCALE.en ? LOCALE.en : DEFAULT_PROPERTY_LOCALE;
};

const getPaginationRange = (page: number, pageSize: number) => {
  const end = page * pageSize;
  const start = end - pageSize;

  return { start, end };
};

const mapProperty = (property: ISanityPropertyResponse): PropertyListing => ({
  id: property._id,
  title: property.title || "Untitled Property",
  slug: property.slug?.current || "",
  href: `/properties/${(property.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
  price: property.price || 0,
  priceUnit: property.priceUnit || PROPERTY_DEFAULT_PRICE_UNIT,
  rentPeriod: property.rentPeriod || PROPERTY_DEFAULT_RENT_PERIOD,
  location: {
    name: property.mapLocation?.name || "",
    lat: property.mapLocation?.coordinates?.lat,
    lng: property.mapLocation?.coordinates?.lng,
  },
  category: property.category || "",
  facilities: (property.facilities || []).map(
    (facility): PropertyFacility => ({
      icon: facility.icon || "",
      name: facility.name || "",
      valueType: facility.valueType || "none",
      numberValue: facility.numberValue,
      textValue: facility.textValue,
    }),
  ),
  description: property.description || "",
  imageUrl: property.imageUrl || "",
  availability: property.availability ?? true,
});

const mapPropertyCategory = (
  category: IPropertyCategoryDocument,
): PropertyCategory => ({
  id: category._id,
  categoryName: category.categoryName || "",
});

export const fetchProperties = async (
  params?: IPropertyParams,
): Promise<IPropertiesResponse> => {
  try {
    const page = params?.page ?? DEFAULT_PROPERTY_PAGE;
    const pageSize = params?.pageSize ?? DEFAULT_PROPERTY_PAGE_SIZE;
    const locale = getLocale(params?.locale);
    const sort = params?.sort ?? PROPERTY_DEFAULT_SORT;
    const { start, end } = getPaginationRange(page, pageSize);

    const response = await client.fetch<{
      properties: ISanityPropertyResponse[];
      total: number;
    }>(
      buildPropertiesQuery(sort),
      {
        start,
        end,
        locale,
        category: params?.category ?? "",
        location: params?.location || "",
        minPrice: params?.minPrice ?? 0,
        maxPrice: params?.maxPrice ?? 0,
        currency: toPriceUnitFilter(params?.currency),
      },
      { next: { tags: ["properties"] } },
    );

    return {
      properties: response.properties.map(mapProperty),
      meta: {
        pagination: {
          total: response.total,
          page,
          pageSize,
          pageCount: Math.ceil(response.total / pageSize),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return EMPTY_PROPERTIES_RESPONSE;
};

export const fetchPropertyCategories = async (
  params?: IPropertyCategoryParams,
): Promise<PropertyCategory[]> => {
  try {
    const response = await client.fetch<IPropertyCategoryDocument[]>(
      PROPERTY_CATEGORIES_QUERY,
      {
        locale: getLocale(params?.locale),
      },
      { next: { tags: ["property-categories"] } },
    );

    return response.map(mapPropertyCategory);
  } catch (error) {
    console.error("Error fetching property categories:", error);
    return [];
  }
};
