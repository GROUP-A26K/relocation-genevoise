import type { Meta } from '@/models/Meta';
import type { Blog } from '@/models/BLog';
import type { BlogCategory } from '@/sanity/types';

export interface BlogListFilters {
  locale: string;
  page: number;
  pageSize: number;
  filterBy?: string;
  search?: string;
  exceptSlug?: string;
}

export interface BlogListResponse {
  blogs: Blog[];
  meta: Meta;
}

export interface BlogCategoriesResponse {
  posts: BlogCategory[];
}

export type { Blog };
export type { BlogDetail } from '@/models/BLog';
