import {
  IPropertyAreaPhotoTour,
  PropertyDetail,
  PropertySimilar,
} from "@/models/Property";
import { client } from "@/sanity/lib/client";
import {
  PROPERTY_DETAIL_QUERY,
  PROPERTY_PHOTO_TOUR_QUERY,
  PROPERTY_SIMILAR_QUERY,
  PROPERTY_SLUG_QUERY,
} from "@/sanity/lib/queries";

export async function getPropertyDetail(slug: string, locale: string = "en") {
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
) {
  try {
    const response = await client.fetch<IPropertyAreaPhotoTour>(
      PROPERTY_PHOTO_TOUR_QUERY,
      { slug: `${locale}-${slug}` },
    );
    return response;
  } catch (error) {
    console.error("Error fetching property photo tour:", error);
    return null;
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


export const fetchPropertySimilar = async (slug: string) => {
  try {
    const response = await client.fetch<{ similar: PropertySimilar[] } | null>(
      PROPERTY_SIMILAR_QUERY,
      { slug },
    );
    return response?.similar ?? [];
  } catch (error) {
    console.error("Error fetching property similar:", error);
    return [];
  }
};