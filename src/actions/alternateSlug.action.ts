'use server';

import { fetchBlogSlugBySlug } from '@/features/blog/blog.service';
import { fetchCareerSlugBySlug } from '@/features/career/career.service';
import { fetchPropertySlugBySlug } from '@/features/property/property.service';

export type AlternateContentType = 'blog' | 'career' | 'property';

const RESOLVERS = {
  blog: fetchBlogSlugBySlug,
  career: fetchCareerSlugBySlug,
  property: fetchPropertySlugBySlug,
} as const;

export const resolveAlternateSlug = async (
  type: AlternateContentType,
  slug: string,
  targetLocale: string
): Promise<string | null> => {
  const translations = await RESOLVERS[type](slug);
  const match = translations.find((item) => item.locale === targetLocale);

  return match?.slug ? match.slug.replace(/^[a-z]{2}-/i, '') : null;
};
