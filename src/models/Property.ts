import { Meta } from "./Meta";

export type PropertyPriceUnit = "CHF";

export type PropertyRentPeriod = "month" | "year";

export type PropertyListingType = "rent" | "sale";

export interface IPropertyListing {
  id: string;
  title: string;
  slug: string;
  href: string;
  price: number;
  priceUnit: PropertyPriceUnit;
  listingType: PropertyListingType;
  rentPeriod: PropertyRentPeriod;
  location: {
    name: string;
    lat?: number;
    lng?: number;
  };
  category: string;
  facilities: PropertyFacility[];
  description: string;
  imageUrl: string;
  availability: boolean;
}

export interface PropertyPagination {
  properties: IPropertyListing[];
  meta: Meta;
}

export interface PropertyFacility {
  icon: string;
  name: string;
  valueType: "number" | "text" | "none";
  numberValue?: number;
  textValue?: string;
}

export interface IPropertyCategory {
  id: string;
  categoryName: string;
}

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface PropertyDetail {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  language: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  listingType: string;
  price: number;
  priceUnit: string;
  rentPeriod: string;
  description: string;
  availability: boolean;
  mapLocation: {
    coordinates: ICoordinates;
  };
  facilities: PropertyFacility[];
  agent: PropertyAgent;
  category: IPropertyCategory;
  areas: PropertyArea[];
  surroundingPlaces: SurroundingPlace[];
}

export interface PropertyAgent {
  _id: string;
  agentName: string;
  agentPhone: string;
  photoUrl: string;
}

export interface PropertySimilar {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: { _type: string; current: string };
  title: string;
  description: string;
  mainImage?: { asset?: { _id: string; url: string } };
}

export interface PropertyArea {
  title: string;
  mainImageUrl: string;
  galleryImages: { url: string }[] | null;
}

export interface SurroundingPlace {
  icon: string;
  name: string;
  distance: string;
}

export interface IPropertyAreaPhotoTour {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: {
    _type: "string";
    current: string;
  };
  areas: IAreaPhotoTour[];
}

export interface IAreaPhotoTour {
  title: string;
  description: string;
  mainImageUrl: string;
  galleryImages: { url: string }[] | null;
}
