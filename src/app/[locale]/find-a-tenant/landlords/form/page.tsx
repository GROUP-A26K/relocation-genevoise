import { getTranslations } from "next-intl/server";

import { AppConfig } from "@/utils/AppConfig";
import FormLayout from "@/components/sections/FindATenant/FormLayout";
import LandlordsForm from "@/components/sections/FindATenant/LandlordsForm";
import FormImage from "@/assets/img/find-a-tenant/landlords/form-image.webp";

import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/[locale]/find-a-tenant/landlords/form">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.FindATenant",
  });

  const { routes } = AppConfig;

  const canonical =
    routes["findATenantLandlordsForm"][
      locale as keyof (typeof routes)["findATenantLandlordsForm"]
    ];

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}/${canonical}`,
    },
  };
}

export default async function Page(
  props: PageProps<"/[locale]/find-a-tenant/landlords/form">,
) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "FindATenant.Landlords.Form",
  });

  return (
    <FormLayout
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      description={t("description")}
      image={{ src: FormImage, alt: t("heading") }}
    >
      <LandlordsForm />
    </FormLayout>
  );
}
