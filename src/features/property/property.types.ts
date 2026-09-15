import type { IPropertyParams } from '@/types';
import type { IAreaPhotoTour, IPropertyCategory } from '@/models/property';

export type PropertyListFilters = IPropertyParams;

export interface PropertyCategoriesResponse {
  categories: IPropertyCategory[];
}

export interface PropertyPhotoTourResponse {
  areas: IAreaPhotoTour[];
}

export type { IAreaPhotoTour, IPropertyCategory };
export type { IPropertiesResponse } from '@/types';
export type { PropertyDetail } from '@/models/property';
