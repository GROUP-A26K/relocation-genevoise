import type { Job } from '@/models/job';
import type { Meta } from '@/models/meta';
import type { AssuranceJobDepartment } from '@/sanity/types';

export interface CareerListFilters {
  locale: string;
  page: number;
  pageSize: number;
  filterBy?: string;
  search?: string;
}

export interface CareerListResponse {
  jobs: Job[];
  meta: Meta;
}

export interface CareerDepartmentsResponse {
  departments: AssuranceJobDepartment[];
}

export interface CareerFeaturedFilters {
  slug: string;
  locale: string;
  filterBy?: string;
}

export interface CareerFeaturedResponse {
  jobs: Job[];
}

export type { Job };
export type { JobDetail } from '@/models/job';
