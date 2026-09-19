import type { IMeta } from './meta';
import type { THref } from '@/libs/i18nNavigation';

export interface IPropertySitemap {
  id: string;
  title: string;
  href: THref;
  slug: string;
}

export type TPropertyPriceUnit = 'CHF';

export type TPropertyRentPeriod = 'month' | 'year';

export type TPropertyListingType = 'rent' | 'sale';

export interface IPropertyListing {
  id: string;
  title: string;
  slug: string;
  href: THref;
  price: number;
  priceUnit: TPropertyPriceUnit;
  listingType: TPropertyListingType;
  rentPeriod: TPropertyRentPeriod;
  location: {
    name: string;
    lat?: number;
    lng?: number;
  };
  category: string;
  facilities: IPropertyFacility[];
  description: string;
  imageUrl: string;
  imageLqip?: string;
  availability: boolean;
}

export interface IPropertyPagination {
  properties: IPropertyListing[];
  meta: IMeta;
}

export interface IPropertyFacility {
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

export interface IPropertyDetail {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  language: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  listingType: TPropertyListingType;
  price: number;
  priceUnit: string;
  rentPeriod: TPropertyRentPeriod;
  description: string;
  availability: boolean;
  mapLocation: {
    coordinates: ICoordinates;
    name: string;
  };
  facilities: IPropertyFacility[];
  agent: IPropertyAgent;
  category: IPropertyCategory;
  areas: IPropertyArea[];
  surroundingPlaces: ISurroundingPlace[];
}

export interface IPropertyAgent {
  _id: string;
  agentName: string;
  agentPhone: string;
  photoUrl: string;
  photoLqip?: string;
}

export interface IPropertySimilar {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  slug: { _type: string; current: string };
  title: string;
  description: string;
  mainImage?: { asset?: { _id: string; url: string } };
}

export interface IPropertyArea {
  title: string;
  mainImageUrl: string;
  mainImageLqip?: string;
  galleryImages: IPropertyGalleryImage[] | null;
}

export interface IPropertyGalleryImage {
  url: string;
  lqip?: string;
}

export interface ISurroundingPlace {
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
