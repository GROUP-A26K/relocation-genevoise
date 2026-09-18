import en from '@/locales/en.json';
import fr from '@/locales/fr.json';

import type { TLocale } from '@/utils/appConfig';

export type TImageMessages = typeof en.Images;
export type TBlogMessages = typeof en.Blog;

const IMAGE_MESSAGES: Record<TLocale, TImageMessages> = {
  en: en.Images,
  fr: fr.Images,
};

const BLOG_MESSAGES: Record<TLocale, TBlogMessages> = {
  en: en.Blog,
  fr: fr.Blog,
};

export const getImageMessages = (locale: TLocale): TImageMessages =>
  IMAGE_MESSAGES[locale];

export const getBlogMessages = (locale: TLocale): TBlogMessages =>
  BLOG_MESSAGES[locale];
