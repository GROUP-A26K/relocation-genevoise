export const LOCALE = {
  en: "en",
  fr: "fr",
} as const;

export type TLocale = (typeof LOCALE)[keyof typeof LOCALE];
