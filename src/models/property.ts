import type { Meta } from './meta';
import type { THref } from '@/libs/i18nNavigation';

export interface PropertySitemap {
  id: string;
  title: string;
  href: THref;
  slug: string;
}

export type PropertyPriceUnit = 'CHF';

export type PropertyRentPeriod = 'month' | 'year';

export type PropertyListingType = 'rent' | 'sale';

export interface IPropertyListing {
  id: string;
  title: string;
  slug: string;
  href: THref;
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
  imageLqip?: string;
  availability: boolean;
}

export interface PropertyPagination {
  properties: IPropertyListing[];
  meta: Meta;
}

export interface PropertyFacility {
  typeRoom: string;
  name: string;
  valueType: 'number' | 'text' | 'none';
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
  listingType: PropertyListingType;
  price: number;
  priceUnit: string;
  rentPeriod: PropertyRentPeriod;
  description: string;
  availability: boolean;
  mapLocation: {
    coordinates: ICoordinates;
    name: string;
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
  photoLqip?: string;
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
  mainImageLqip?: string;
  galleryImages: IPropertyGalleryImage[] | null;
}

export interface IPropertyGalleryImage {
  url: string;
  lqip?: string;
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
    _type: 'string';
    current: string;
  };
  areas: IAreaPhotoTour[];
}

export interface IAreaPhotoTour {
  title: string;
  description: string;
  mainImageUrl: string;
  mainImageLqip?: string;
  galleryImages: IPropertyGalleryImage[] | null;
}
