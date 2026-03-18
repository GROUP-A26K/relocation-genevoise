import { Button } from "@/components/ui/button-custom";
import { IPropertyListing } from "@/models/Property";
import { PropertyCard } from "@/components/customs/Card";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Section from "@/components/customs/Section";

interface IPropertyDetailSimilarProps {
  relatedProperties: IPropertyListing[];
}

export async function PropertyDetailSimilar({
  relatedProperties,
}: IPropertyDetailSimilarProps) {
  const t = await getTranslations("PropertiesDetails");

  return (
    <Section>
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

        <Link href="/properties">
          <Button className="rounded-full">{t("similar.viewAllButton")}</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {relatedProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </Section>
  );
}
