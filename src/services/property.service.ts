import {
  buildPropertiesQuery,
  PROPERTY_CATEGORIES_QUERY,
  PROPERTY_DETAIL_QUERY,
  PROPERTY_PHOTO_TOUR_QUERY,
  PROPERTY_SLUG_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
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
): IPropertyCategory => ({
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

    const categories = params?.category?.filter(Boolean) ?? [];

    const response = await client.fetch<{
      properties: ISanityPropertyResponse[];
      total: number;
    }>(
      buildPropertiesQuery(sort),
      {
        start,
        end,
        locale,
        categories,
        location: params?.location || "",
        minPrice: params?.minPrice ?? 0,
        maxPrice: params?.maxPrice ?? 0,
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
): Promise<IPropertyCategory[]> => {
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

export async function getPropertyDetail(
  slug: string,
  locale: string = "en",
): Promise<PropertyDetail | null> {
  try {
    const response = await client.fetch<PropertyDetail>(PROPERTY_DETAIL_QUERY, {
      slug: `${locale}-${slug}`,
    });

    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    console.error("Error fetching property detail:", error);
    return null;
  }
}

export async function getPropertyPhotoTour(
  slug: string,
  locale: string = "en",
): Promise<IAreaPhotoTour[]> {
  try {
    const response = await client.fetch<IAreaPhotoTour[]>(
      PROPERTY_PHOTO_TOUR_QUERY,
      { slug: `${locale}-${slug}` },
    );
    return response;
  } catch (error) {
    console.error("Error fetching property photo tour:", error);
    return [];
  }
}

export const fetchPropertySlugBySlug = async (slug: string) => {
  try {
    const response = await client.fetch<{
      targetSlug: {
        language: string;
        slug: string;
      }[];
    } | null>(PROPERTY_SLUG_QUERY, { slug });

    if (!response?.targetSlug) {
      return [];
    }

    return response.targetSlug.map((item) => ({
      locale: item.language,
      slug: item.slug,
      href: `/properties/${item.slug.replace(/^[a-z]{2}-/i, "")}`,
    }));
  } catch (error) {
    console.error("Error fetching property slug:", error);
    return [];
  }
};
