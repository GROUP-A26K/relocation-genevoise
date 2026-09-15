import type { Meta } from '@/models/meta';
import type { Blog } from '@/models/blog';
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
export type { BlogDetail } from '@/models/blog';
