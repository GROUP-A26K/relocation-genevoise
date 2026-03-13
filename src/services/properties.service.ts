import { IPropertyAreaPhotoTour, PropertyDetail } from "@/models/Property";
import { client } from "@/sanity/lib/client";
import { PROPERTY_DETAIL_QUERY, PROPERTY_PHOTO_TOUR_QUERY } from "@/sanity/lib/queries";

export async function getPropertyDetail(slug: string, locale: string = "en") {
  try {
    const response = await client.fetch<PropertyDetail>(
      PROPERTY_DETAIL_QUERY,
      { slug: `${locale}-${slug}` }
    );

    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    console.error("Error fetching property detail:", error);
    return null;
  }
}


export async function getPropertyPhotoTour(slug: string, locale: string = "en") {
  try {
    const response = await client.fetch<IPropertyAreaPhotoTour>(
      PROPERTY_PHOTO_TOUR_QUERY,
      { slug: `${locale}-${slug}` }
    );
    return response;
  } catch (error) {
    console.error("Error fetching property photo tour:", error);
    return null;
  }
}