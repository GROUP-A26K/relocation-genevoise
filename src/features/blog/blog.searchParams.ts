import type { BlogListFilters } from './blog.types';

export function normalizeBlogListFilters(
  filters: Partial<BlogListFilters> & Pick<BlogListFilters, 'locale'>
): BlogListFilters {
  return {
    locale: filters.locale,
    page: Math.max(1, filters.page ?? 1),
    pageSize: Math.min(100, Math.max(1, filters.pageSize ?? 9)),
    filterBy: filters.filterBy ?? '',
    search: filters.search ?? '',
    ...(filters.exceptSlug ? { exceptSlug: filters.exceptSlug } : {}),
  };
}

export function parseBlogSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Pick<BlogListFilters, 'page' | 'filterBy' | 'search'> {
  const read = (key: string): string => {
    const value = searchParams[key];
    return (Array.isArray(value) ? value[0] : value) ?? '';
  };

  return {
    page: Number(read('page')) || 1,
    filterBy: read('filterBy'),
    search: read('search'),
  };
}
