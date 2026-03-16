"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button-custom";
import { useRouter } from "next/navigation";
import { PropertyListing } from "@/models/Property";
import { PropertyCard } from "@/components/customs/Card";

interface IPropertyDetailSimilarProps {
  relatedProperties: PropertyListing[];
}

export const PropertyDetailSimilar = ({
  relatedProperties,
}: IPropertyDetailSimilarProps) => {
  const router = useRouter();
  const t = useTranslations("PropertiesDetails");

  const handleViewAll = () => {
    router.push("/properties");
  };

  return (
    <div className="flex flex-col gap-16 py-12 lg:py-16 px-4 2xl:px-[100px] xl:px-[60px] lg:px-[48px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-end">
        <div className="flex flex-col gap-6 max-w-3xl">
          <div className="flex flex-col items-start gap-3">
            <p className="text-yellow-600 font-semibold text-sm !leading[130%]">
              {t("similar.title")}
            </p>
            <h2 className="font-semibold text-3xl !leading[130%] text-black-500">
              {t("similar.subheading")}
            </h2>
          </div>

          <p className="text-black-200 text-sm !leading[130%]">
            {t("similar.description")}
          </p>
        </div>

        <Button className="rounded-full" onClick={handleViewAll}>
          {t("similar.viewAllButton")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {relatedProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};
