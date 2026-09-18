import type { TApplicationDraftKey } from '@/features/formDraft/formDraft.types';

export interface IApplicationTranslationSlug {
  slug: string;
}

/**
 * Translation slugs are the stable identity shared by localized application
 * pages. Sorting makes the key independent of the order returned by Sanity.
 */
export const getApplicationDraftKey = (
  jobId: string,
  translations: IApplicationTranslationSlug[]
): TApplicationDraftKey => {
  const slugs = translations
    .map((translation) => translation.slug)
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return `application:${slugs.length > 0 ? slugs.join('|') : `job:${jobId}`}`;
};
