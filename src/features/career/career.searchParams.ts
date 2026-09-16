import type { TCareerListFilters } from './career.types';

export function normalizeCareerListFilters(
  filters: Partial<TCareerListFilters> & Pick<TCareerListFilters, 'locale'>
): TCareerListFilters {
  return {
    locale: filters.locale,
    page: Math.max(1, filters.page ?? 1),
    pageSize: Math.min(100, Math.max(1, filters.pageSize ?? 5)),
    filterBy: filters.filterBy ?? '',
    search: filters.search ?? '',
  };
}

export function parseCareerSearchParams(
  searchParams: Record<string, string | string[] | undefined>
): Pick<TCareerListFilters, 'page' | 'filterBy'> {
  const read = (key: string): string => {
    const value = searchParams[key];
    return (Array.isArray(value) ? value[0] : value) ?? '';
  };

  return {
    page: Number(read('page')) || 1,
    filterBy: read('filterBy'),
  };
}
