import type { IMeta } from '@/models/meta';
import type { IBlog } from '@/models/blog';
import type { POST_CATEGORIES_QUERY_RESULT } from '@/sanity/types';

export type TBlogListFilters = {
  locale: string;
  page: number;
  pageSize: number;
  filterBy?: string;
  search?: string;
  exceptSlug?: string;
};

export interface IBlogListResponse {
  blogs: IBlog[];
  meta: IMeta;
}

export interface IBlogCategoriesResponse {
  posts: POST_CATEGORIES_QUERY_RESULT;
}

export type { IBlog };
export type { IBlogDetail } from '@/models/blog';
