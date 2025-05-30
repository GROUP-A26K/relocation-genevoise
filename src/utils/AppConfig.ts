import { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";

export const AppConfig = {
  name: "Nextjs Starter",
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix,
  routes: {
    assistance: { fr: "/assistance", en: "/support", priority: 0.9 },
    personalData: {
      fr: "/donnes-personnelles",
      en: "/personal-data",
      priority: 0.9,
    },
    legalNotice: {
      fr: "/mentions-legales",
      en: "/legal-notice",
      priority: 0.9,
    },
    callMe: { fr: "/rappelez-moi", en: "/call-me", priority: 0.9 },
    personalInsurance: {
      fr: "/particulier/assurance",
      en: "/personal/insurance",
      priority: 0.9,
    },
  },
};
