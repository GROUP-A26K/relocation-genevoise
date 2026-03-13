"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";

import { BookConsultation2 } from "@/components/blocks/Consultation";
import { PropertyCategory } from "@/models/Property";

import { PropertyListingsSection } from "./PropertyListingsSection";
import { PropertiesHero } from "./PropertiesHero";
import { SearchFilters } from "./SearchFilters";

interface IPageViewProps {
  categories: PropertyCategory[];
}

export const PageView: FC<IPageViewProps> = ({ categories }) => {
  const t = useTranslations("Properties");

  return (
    <>
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
    </>
  );
};
