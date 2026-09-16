import { getMailToHref, getTelHref } from '@/utils/contact';

import type { TLocale } from '@/utils/appConfig';

export const SITE_NAME = 'Relocation Genevoise';

export const ORGANIZATION = {
  name: SITE_NAME,
  legalName: 'RG Relocation Genevoise SA',
  email: 'contact@relocation-genevoise.ch',
  telephone: '+41 22 715 17 48',
  address: {
    streetAddress: 'Rue des Alpes 5',
    postalCode: '1201',
    addressLocality: 'Genève',
    addressRegion: 'GE',
    addressCountry: 'CH',
  },
  areaServed: 'Genève',
  availableLanguage: ['French', 'English'],
  logo: {
    path: '/web-app-manifest-512x512.png',
    width: 512,
    height: 512,
  },
  sameAs: [
    'https://www.facebook.com/people/Relocation-Genevoise/61566756459931/',
    'https://www.linkedin.com/company/relocation-genevoise',
    'https://www.instagram.com/relocationgenevoise/',
  ],
} as const;

export const CONTACT_EMAIL_HREF = getMailToHref(ORGANIZATION.email);

export const CONTACT_PHONE_HREF = getTelHref(ORGANIZATION.telephone);

export const OG_IMAGE = {
  path: '/relocation-genevoise-preview.png',
  width: 2400,
  height: 1260,
  alt: SITE_NAME,
} as const;

export const OG_LOCALES: Record<TLocale, string> = {
  fr: 'fr_CH',
  en: 'en_GB',
};

export const LANGUAGE_TAGS: Record<TLocale, string> = {
  fr: 'fr-CH',
  en: 'en-CH',
};
