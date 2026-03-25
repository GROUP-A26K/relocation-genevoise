import { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";

export const AppConfig = {
  name: "Nextjs Starter",
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix,
  routes: {
    home: { fr: "/", en: "/", priority: 1.0 },
    blog: { fr: "/blog", en: "/blog", priority: 0.8 },
    personalData: {
      fr: "/donnes-personnelles",
      en: "/personal-data",
      priority: 0.3,
    },
    sitemap: { fr: "/sitemap", en: "/sitemap", priority: 0.3 },
    LegalNotices: {
      fr: "/mentions-legales",
      en: "/legal-notice",
      priority: 0.3,
    },
    career: { fr: "/carriere", en: "/career", priority: 0.8 },
    callMeBack: { fr: "/rappelez-moi", en: "/call-me-back", priority: 0.8 },
    contact: { fr: "/contact", en: "/contact", priority: 0.8 },
    academicService: {
      fr: "/prestations/scolarite",
      en: "/services/academic",
      priority: 0.5,
    },
    conciergeService: {
      fr: "/prestations/service-de-conciergerie",
      en: "/services/concierge-service",
      priority: 0.5,
    },
    discoverGenevaService: {
      fr: "/prestations/decouvrir-geneve",
      en: "/services/discover-geneva",
      priority: 0.5,
    },
    companies: {
      fr: "/entreprises",
      en: "/companies",
      priority: 0.7,
    },
    findATenant: {
      fr: "/trouver-un-locataire",
      en: "/find-a-tenant",
      priority: 0.8,
    },
    findAccommodation: {
      fr: "/trouver-un-logement",
      en: "/find-accommodation",
      priority: 0.8,
    },
    faq: {
      fr: "/faq",
      en: "/faq",
      priority: 0.6,
    },
    properties: {
      fr: "/proprietes",
      en: "/properties",
      priority: 0.7,
    },
  },
};
