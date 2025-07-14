import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { AppConfig } from "@/utils/AppConfig";
import { PageView } from "@/components/sections/Career";
import { fetchDepartments } from "@/services/career/career.service";
type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: "Metadata.Career",
  });

  const { routes } = AppConfig;
  const canonical = routes["career"][locale as keyof (typeof routes)["career"]];
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale == "fr" ? "" : locale}/${canonical}`,
    },
  };
}
export default async function Page(props: Props) {
  const { locale } = await props.params;

  const { departments } = await fetchDepartments({ locale });

  return (
    <Suspense fallback={null}>
      <PageView departments={departments} />;
    </Suspense>
  );
}
