'use server';

import { fetchBlogSlugBySlug } from '@/services/blog.service';
import { fetchPropertySlugBySlug } from '@/services/property.service';
import { fetchCareerSlugBySlug } from '@/services/career/career.service';

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

  return match?.href ? `/${targetLocale}${match.href}` : null;
};
