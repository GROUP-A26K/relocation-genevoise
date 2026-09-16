import type { TPropertyParams } from '@/types';
import type { IAreaPhotoTour, IPropertyCategory } from '@/models/property';

export type TPropertyListFilters = TPropertyParams;

export interface IPropertyCategoriesResponse {
  categories: IPropertyCategory[];
}

export interface IPropertyPhotoTourResponse {
  areas: IAreaPhotoTour[];
}

export type { IAreaPhotoTour, IPropertyCategory };
export type { IPropertiesResponse } from '@/types';
export type { IPropertyDetail } from '@/models/property';
