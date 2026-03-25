import { Meta } from "@/models/Meta";
import type {
  IPropertyListing,
  PropertyPriceUnit,
  PropertyRentPeriod,
} from "@/models/Property";

export interface IIconProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface IPropertyParams {
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
}

export interface IPropertyCategoryParams {
  locale?: string;
}

export interface ISanityPropertyFacility {
  typeRoom?: string;
  name?: string;
  valueType?: "number" | "text" | "none";
  numberValue?: number;
  textValue?: string;
}

export interface ISanityPropertyResponse {
  _id: string;
  title?: string;
  slug?: { current?: string };
  price?: number;
  priceUnit?: PropertyPriceUnit;
  listingType?: "rent" | "sale";
  rentPeriod?: PropertyRentPeriod;
  language?: string;
  availability?: boolean;
  description?: string;
  mapLocation?: {
    name?: string;
    coordinates?: { lat?: number; lng?: number };
  };
  category?: string;
  facilities?: ISanityPropertyFacility[];
  imageUrl?: string;
}

export interface IPropertyCategoryDocument {
  _id: string;
  categoryName?: string;
}

export interface IPropertiesResponse {
  properties: IPropertyListing[];
  meta: Meta;
}

export type Property = {
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

export type ImageObj = {
  id: string;
  url: string;
  isPrimary?: boolean;
};

export type GalleryMap = {
  [key: string]: {
    images: ImageObj[];
    description: string;
  };
};
