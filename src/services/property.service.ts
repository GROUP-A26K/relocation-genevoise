import {
  buildPropertiesQuery,
  PROPERTY_CATEGORIES_QUERY,
} from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import {
  PropertyCategory,
  PropertyFacility,
  PropertyListing,
  PropertyPriceUnit,
  PropertyRentPeriod,
} from "@/models/Property";
import { Meta } from "@/models/Meta";

export interface PropertyParamsProps {
  page?: number;
  pageSize?: number;
  locale?: string;
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

interface PropertyCategoryParams {
  locale?: string;
}

interface SanityPropertyResponse {
  _id: string;
  title?: string;
  slug?: { current?: string };
  price?: number;
  priceUnit?: PropertyPriceUnit;
  rentPeriod?: PropertyRentPeriod;
  language?: string;
  availability?: boolean;
  description?: string;
  mapLocation?: {
    name?: string;
    coordinates?: { lat?: number; lng?: number };
  };
  category?: string;
  facilities?: {
    icon?: string;
    name?: string;
    valueType?: "number" | "text" | "none";
    numberValue?: number;
    textValue?: string;
  }[];
  imageUrl?: string;
}

export const fetchProperties = async (
  params?: PropertyParamsProps
): Promise<{ properties: PropertyListing[]; meta: Meta }> => {
  try {
    const end = (params?.page || 1) * (params?.pageSize || 15);
    const start = end - (params?.pageSize || 15);

    const sort = params?.sort ?? "newest";
    const query = buildPropertiesQuery(sort);

    const response = await client.fetch<{
      properties: SanityPropertyResponse[];
      total: number;
    }>(
      query,
      {
        start,
        end,
        locale: params?.locale ?? "fr",
        category: params?.category ?? "",
        location: params?.location || "",
        minPrice: params?.minPrice ?? 0,
        maxPrice: params?.maxPrice ?? 0,
      },
      { next: { tags: ["properties"] } }
    );

    return {
      properties: response.properties.map((property) => ({
        id: property._id,
        title: property.title || "Untitled Property",
        slug: property.slug?.current || "",
        href: `/properties/${(property.slug?.current || "").replace(/^[a-z]{2}-/i, "")}`,
        price: property.price || 0,
        priceUnit: property.priceUnit || "$",
        rentPeriod: property.rentPeriod || "month",
        location: {
          name: property.mapLocation?.name || "",
          lat: property.mapLocation?.coordinates?.lat,
          lng: property.mapLocation?.coordinates?.lng,
        },
        category: property.category || "",
        facilities: (property.facilities || []).map(
          (f): PropertyFacility => ({
            icon: f.icon || "",
            name: f.name || "",
            valueType: f.valueType || "none",
            numberValue: f.numberValue,
            textValue: f.textValue,
          })
        ),
        description: property.description || "",
        imageUrl: property.imageUrl || "",
        availability: property.availability ?? true,
      })),
      meta: {
        pagination: {
          total: response.total,
          page: params?.page || 1,
          pageSize: params?.pageSize || 15,
          pageCount: Math.ceil(response.total / (params?.pageSize || 15)),
        },
      },
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  return {
    properties: [],
    meta: { pagination: { total: 0, page: 0, pageSize: 0, pageCount: 0 } },
  };
};

export const fetchPropertyCategories = async (
  params?: PropertyCategoryParams
): Promise<PropertyCategory[]> => {
  try {
    const response = await client.fetch<{ _id: string; categoryName?: string }[]>(
      PROPERTY_CATEGORIES_QUERY,
      {
        locale: params?.locale ?? "fr",
      },
      { next: { tags: ["property-categories"] } }
    );

    return response.map((cat) => ({
      id: cat._id,
      categoryName: cat.categoryName || "",
    }));
  } catch (error) {
    console.error("Error fetching property categories:", error);
    return [];
  }
};
