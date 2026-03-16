import { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";

import { fetchPropertyCategories } from "@/services/property.service";
import { BookConsultation2 } from "@/components/blocks/Consultation";
import PropertiesHero from "@/components/sections/Properties/PropertiesHero";
import PropertyListingsSection from "@/components/sections/Properties/PropertyListingsSection";
import { SearchFilters } from "@/components/sections/Properties/SearchFilters";

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
  const t = await getTranslations("Properties");
  const categories = await fetchPropertyCategories({ locale });

  return (
    <Suspense fallback={null}>
      <section className="relative">
        <PropertiesHero />
        <div className="relative z-10 -mt-16 sm:-mt-20 lg:-mt-24">
          <SearchFilters categories={categories} />
        </div>
      </section>
      <PropertyListingsSection />
      <section className="w-full flex justify-center">
        <div className="w-full max-w-[1240px] bg-grey-50 max-md:px-4 xl:rounded-[24px]">
          <BookConsultation2
            heading={t("BookConsultation.heading")}
            subHeading={t("BookConsultation.subHeading")}
            description={t("BookConsultation.description")}
            buttonText1={t("BookConsultation.buttonText1")}
            buttonText2={t("BookConsultation.buttonText2")}
          />
        </div>
      </section>
    </Suspense>
  );
}
