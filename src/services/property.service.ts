import "server-only";

import {
  buildPropertiesQuery,
  PROPERTIES_SITEMAP_QUERY,
  PROPERTY_CATEGORIES_QUERY,
  PROPERTY_DETAIL_QUERY,
  PROPERTY_PHOTO_TOUR_QUERY,
  PROPERTY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import { LOCALE, type TLocale } from "@/constants/locale";
import {
  PROPERTY_DEFAULT_PRICE_UNIT,
  PROPERTY_DEFAULT_RENT_PERIOD,
  PROPERTY_DEFAULT_SORT,
} from "@/constants/property";
import {
  IAreaPhotoTour,
  IPropertyCategory,
  PropertyDetail,
  PropertyFacility,
  IPropertyListing,
  PropertyListingType,
  PropertySitemap,
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
const getLocale = (locale?: string): TLocale => {
  return locale === LOCALE.en ? LOCALE.en : DEFAULT_PROPERTY_LOCALE;
};

const getPaginationRange = (page: number, pageSize: number) => {
  const end = page * pageSize;
  const start = end - pageSize;

  return { start, end };
};

const mapProperty = (property: ISanityPropertyResponse): IPropertyListing => ({
  id: property._id,
  title: property.title || "Untitled Property",
  slug: property.slug?.current || "",
  href: `/properties/${(property.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
  price: property.price || 0,
  priceUnit: property.priceUnit || PROPERTY_DEFAULT_PRICE_UNIT,
  listingType: (property.listingType as PropertyListingType) || "rent",
  rentPeriod: property.rentPeriod || PROPERTY_DEFAULT_RENT_PERIOD,
  location: {
    name: property.mapLocation?.name || "",
    lat: property.mapLocation?.coordinates?.lat,
    lng: property.mapLocation?.coordinates?.lng,
  },
  category: property.category || "",
  facilities: (property.facilities || []).map(
    (facility): PropertyFacility => ({
      typeRoom: facility.typeRoom || "",
      name: facility.name || "",
      valueType: facility.valueType || "none",
      numberValue: facility.numberValue,
      textValue: facility.textValue,
    }),
  ),
  description: property.description || "",
  imageUrl: property.imageUrl || "",
  availability: Boolean(property.availability),
});

const mapPropertyCategory = (
  category: IPropertyCategoryDocument,
): IPropertyCategory => ({
  id: category._id,
  categoryName: category.categoryName || "",
});

export const fetchProperties = async (
  params?: IPropertyParams,
): Promise<IPropertiesResponse> => {
  const page = params?.page ?? DEFAULT_PROPERTY_PAGE;
  const pageSize = params?.pageSize ?? DEFAULT_PROPERTY_PAGE_SIZE;
  const locale = getLocale(params?.locale);
  const sort = params?.sort ?? PROPERTY_DEFAULT_SORT;
  const { start, end } = getPaginationRange(page, pageSize);

  const categories = params?.category?.filter(Boolean) ?? [];

  const availableOnly = params?.availableOnly ?? false;

  const response = await sanityFetch<{
    properties: ISanityPropertyResponse[];
    total: number;
  }>(
    buildPropertiesQuery(sort, availableOnly),
    {
      start,
      end,
      locale,
      categories,
      location: params?.location || "",
      minPrice: params?.minPrice ?? 0,
      maxPrice: params?.maxPrice ?? 0,
      rooms: params?.rooms ?? "",
    },
    { tags: ["properties"] },
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
};

export const fetchPropertyCategories = async (
  params?: IPropertyCategoryParams,
): Promise<IPropertyCategory[]> => {
  const response = await sanityFetch<IPropertyCategoryDocument[]>(
    PROPERTY_CATEGORIES_QUERY,
    {
      locale: getLocale(params?.locale),
    },
    { tags: ["property-categories"] },
  );

  return response.map(mapPropertyCategory);
};

export async function getPropertyDetail(
  slug: string,
  locale: string = "en",
): Promise<PropertyDetail | null> {
  const response = await sanityFetch<PropertyDetail | null>(
    PROPERTY_DETAIL_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ["property"] },
  );

  return response ?? null;
}

export async function getPropertyPhotoTour(
  slug: string,
  locale: string = "en",
): Promise<IAreaPhotoTour[]> {
  return sanityFetch<IAreaPhotoTour[]>(
    PROPERTY_PHOTO_TOUR_QUERY,
    { slug: `${locale}-${slug}` },
    { tags: ["property"] },
  );
}

export const fetchSitemapProperties = async (
  params?: IPropertyParams,
): Promise<{ properties: PropertySitemap[]; meta: { total: number } }> => {
  const response = await sanityFetch<{
    properties: ISanityPropertyResponse[];
    total: number;
  }>(
    PROPERTIES_SITEMAP_QUERY,
    {
      locale: getLocale(params?.locale),
    },
    { tags: ["sitemap-properties"] },
  );

  return {
    properties: response.properties.map((property) => ({
      id: property._id,
      title: property.title || "Untitled Property",
      slug: property.slug?.current || "",
      href: `/properties/${(property.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
    })),
    meta: { total: response.total },
  };
};

export const fetchPropertySlugBySlug = async (slug: string) => {
  const response = await sanityFetch<{
    targetSlug: {
      language: string;
      slug: string;
    }[];
  } | null>(PROPERTY_SLUG_QUERY, { slug }, { tags: ["property"] });

  if (!response?.targetSlug) {
    return [];
  }

  return response.targetSlug.map((item) => ({
    locale: item.language,
    slug: item.slug,
    href: `/properties/${item.slug.replace(/^[a-z]{2}-/i, "")}`,
  }));
};
