import { getTranslations } from "next-intl/server";

import { AppConfig } from "@/utils/AppConfig";
import FormLayout from "@/components/sections/FindATenant/FormLayout";
import TenantForm from "@/components/sections/FindATenant/TenantForm";
import FormImage from "@/assets/img/find-a-tenant/tenant/form-image.webp";

import type { Metadata } from "next";

export async function generateMetadata(
  props: PageProps<"/[locale]/find-a-tenant/tenant/form">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.FindAccommodation",
  });

  const { routes } = AppConfig;

  const canonical =
    routes["findATenantTenantForm"][
      locale as keyof (typeof routes)["findATenantTenantForm"]
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
  props: PageProps<"/[locale]/find-a-tenant/tenant/form">,
) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "FindATenant.Tenant.Form",
  });

  return (
    <FormLayout
      eyebrow={t("eyebrow")}
      heading={t("heading")}
      description={t("description")}
      image={{ src: FormImage, alt: t("heading") }}
      imageWrapperClassname="aspect-[556/668]"
    >
      <TenantForm />
    </FormLayout>
  );
}
