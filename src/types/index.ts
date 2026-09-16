import type { IMeta } from '@/models/meta';
import type { IPropertyListing } from '@/models/property';

export type TPropertyParams = {
  page?: number;
  pageSize?: number;
  locale?: string;
  category?: string[];
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  currency?: string;
  sort?: string;
  rooms?: string;
  availableOnly?: boolean;
};

export type TPropertyCategoryParams = {
  locale?: string;
};

export interface IPropertiesResponse {
  properties: IPropertyListing[];
  meta: IMeta;
}

export type TProperty = {
  id: string;
  title: string;
  type: string;
  status: string;
  price: number;
  location: {
    street: string;
    city: string;
    country: string;
    full: string;
    lat: number;
    lng: number;
  };
  gallery: {
    id: string;
    url: string;
    isPrimary?: boolean;
  }[];
  facilities: {
    type: string;
    value: string | number | boolean;
    unit?: string;
  }[];
  description: string;
  surroundings: {
    type: string;
    distance: number;
    unit: string;
  }[];
  agent: {
    id: string;
    name: string;
    phone: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type TImageObj = {
  id: string;
  url: string;
  isPrimary?: boolean;
};

export type TGalleryMap = {
  [key: string]: {
    images: TImageObj[];
    description: string;
  };
};
