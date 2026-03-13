import { Env } from "@/libs/Env";
import { IPropertyPhotoTour } from "@/models/Property";
import { client } from "@/sanity/lib/client";
import { PROPERTY_PHOTO_TOUR_QUERY } from "@/sanity/lib/queries";

export async function getPropertyDetail(id: string, locale: string = "en") {
  const baseUrl = Env.NEXT_PUBLIC_SITE_URL || "";
  const res = await fetch(`${baseUrl}/api/properties/${id}`, {
    headers: { "Accept-Language": locale },
    cache: "no-store"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch property detail");
  }

  const { data } = await res.json();
  console.log(data);
  return data;
}


export async function getPropertyPhotoTour(id: string, locale: string = "en") {
  try {
    const response = await client.fetch<IPropertyPhotoTour>(
      PROPERTY_PHOTO_TOUR_QUERY,
      { id, locale }
    );
    return response;
  } catch (error) {
    console.error("Error fetching property photo tour:", error);
    return null;
  }
}