'use server';

import { toUrlSlug } from '@/utils/slug';
import { fetchBlogSlugBySlug } from '@/features/blog/blog.service';
import { fetchCareerSlugBySlug } from '@/features/career/career.service';
import { fetchPropertySlugBySlug } from '@/features/property/property.service';

export type TAlternateContentType = 'blog' | 'career' | 'property';

const RESOLVERS = {
  blog: fetchBlogSlugBySlug,
  career: fetchCareerSlugBySlug,
  property: fetchPropertySlugBySlug,
} as const;

export const resolveAlternateSlug = async (
  type: TAlternateContentType,
  slug: string,
  targetLocale: string
): Promise<string | null> => {
  const translations = await RESOLVERS[type](slug);
  const match = translations.find((item) => item.locale === targetLocale);

  return match?.slug ? toUrlSlug(match.slug) : null;
};
