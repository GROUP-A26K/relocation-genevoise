import { LocalePrefixMode } from "next-intl/routing";

const localePrefix: LocalePrefixMode = "as-needed";

export const AppConfig = {
  name: "Nextjs Starter",
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix,
  routes: {
    assistance: { fr: "/assistance", en: "/support" },
    personalData: { fr: "/donnes-personnelles", en: "/personal-data" },
    legalNotice: { fr: "/mentions-legales", en: "/legal-notice" },
    callMe: { fr: "/rappelez-moi", en: "/call-me" },
  },
};
