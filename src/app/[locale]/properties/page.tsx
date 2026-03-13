import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { fetchPropertyCategories } from "@/services/property.service";
import { PageView } from "@/components/sections/Properties/PageView";

type Props = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Properties",
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale === "fr" ? "" : locale}/properties`,
    },
  };
}

export default async function PropertiesPage(props: Props) {
  const { locale } = await props.params;

  const categories = await fetchPropertyCategories({ locale });

  return (
    <Suspense fallback={null}>
      <PageView categories={categories} />
    </Suspense>
  );
}
