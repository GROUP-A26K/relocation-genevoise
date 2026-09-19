import type { IJob } from '@/models/job';
import type { IMeta } from '@/models/meta';
import type { DEPARTMENT_QUERY_RESULT } from '@/sanity/types';

export type TCareerListFilters = {
  locale: string;
  page: number;
  pageSize: number;
  filterBy?: string;
  search?: string;
};

export interface ICareerListResponse {
  jobs: IJob[];
  meta: IMeta;
}

export interface ICareerDepartmentsResponse {
  departments: DEPARTMENT_QUERY_RESULT;
}

export type TCareerFeaturedFilters = {
  slug: string;
  locale: string;
  filterBy?: string;
};

export interface ICareerFeaturedResponse {
  jobs: IJob[];
}

export type { IJob };
export type { IJobDetail } from '@/models/job';
