import type { TPropertyParams } from '@/types';
import type { IAreaPhotoTour, IPropertyCategory } from '@/models/property';

export type TPropertyListFilters = TPropertyParams;

export type TPropertySearchFormValues = {
  categories: string[];
  location: string;
  priceRange: string;
  currency: string;
  rooms: string;
};

export interface IPropertySearchDraftMeta {
  urlAnchor: string;
}

export interface IPropertyCategoriesResponse {
  categories: IPropertyCategory[];
}

export interface IPropertyPhotoTourResponse {
  areas: IAreaPhotoTour[];
}

export type { IAreaPhotoTour, IPropertyCategory };
export type { IPropertiesResponse } from '@/types';
export type { IPropertyDetail } from '@/models/property';
