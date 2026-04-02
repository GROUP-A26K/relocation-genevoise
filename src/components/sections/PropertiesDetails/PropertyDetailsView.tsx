"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { PropertyDetailContainer } from "./PropertyDetailContainer";
import { PropertyDetailSection } from "./PropertiesDetailSection";
import { PropertyDetailTable } from "@/components/blocks/PropertyDetail/Table";
import { PropertyDescription } from "@/components/blocks/PropertyDetail/Description";
import { PropertyMap } from "@/components/blocks/PropertyDetail/Map";
import { PropertyAgentDetails } from "@/components/blocks/PropertyDetail/AgentInfo";

import { PropertyDetail } from "@/models/Property";
import {
  FacilityIconMap,
  SurroundingPlaceIconMap,
} from "./PropertiesDetailIcon";
import { MapPin } from "lucide-react";

interface IPropertyDetailViewProps {
  property: PropertyDetail;
}

export const PropertyDetailView = ({ property }: IPropertyDetailViewProps) => {
  const t = useTranslations("PropertiesDetails");
  const [tableColumns, setTableColumns] = useState({
    facilities: 3,
    surrounding: 2,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setTableColumns({ facilities: 1, surrounding: 1 });
      } else {
        setTableColumns({ facilities: 3, surrounding: 2 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const facilityItems = property.facilities.map((item) => ({
    label: item.name,
    value: item.valueType === "none" ? undefined : (item.numberValue ?? item.textValue),
    unit: item.valueType !== "none" && item.typeRoom === "area" ? "m²" : undefined,
    icon: item.typeRoom,
  }));

  const surroundingItems = property.surroundingPlaces.map((item) => ({
    label: item.name,
    value: item.distance,
    icon: item.icon,
  }));

  return (
    <PropertyDetailContainer>
      <div className="lg:col-span-6 flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="h-4 w-4 rounded-full bg-green-500 border-[3px] border-green-200"></span>
              <span>
                {property.availability
                  ? t("status.available")
                  : t("status.notAvailable")}
              </span>
              <div className="flex gap-2 items-center">
                <span
                  className={`shadow-none text-xs !leading-[130%] font-medium px-3 py-1 rounded-[6px] w-fit ${
                    property.listingType === "sale"
                      ? "bg-yellow-50 text-yellow-800"
                      : "bg-blue-50 text-blue-500"
                  }`}
                >
                  {t(`listingType.${property.listingType || "rent"}`)}
                </span>
                <span className="bg-grey-100 text-black-500 font-medium shadow-none text-xs !leading-[130%] px-3 py-1 rounded-[6px] w-fit">
                  {property.category.categoryName}
                </span>
              </div>
            </div>
            <h1 className="font-semibold text-3xl !leading-[130%] tracking-normal text-primary-500">
              {property.title}
            </h1>
            <div className="flex gap-1.5 font-normal text-black-200 !leading-[130%] text-sm">
              <MapPin className="w-4 h-4" />
              <p>{property.mapLocation.name}</p>
            </div>
          </div>
          <div className="items-baseline">
            <span className="font-semibold text-blue-500 text-3xl !leading-[130%] py-0">
              ${property.price}
            </span>
            {property.listingType !== "sale" && (
              <span className="font-semibold text-black-200 !leading-[130%] text-lg relative">
                {t(`rentPeriod.${property.rentPeriod || "month"}`)}
              </span>
            )}
          </div>
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.facilities")}
            content={
              <PropertyDetailTable
                items={facilityItems}
                iconMap={FacilityIconMap}
                columns={tableColumns.facilities}
              />
            }
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.description")}
            content={<PropertyDescription content={property.description} />}
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.surrounding")}
            content={
              <PropertyDetailTable
                items={surroundingItems}
                iconMap={SurroundingPlaceIconMap}
                columns={tableColumns.surrounding}
              />
            }
          />
        </div>
      </div>
      
      <div className="w-full lg:col-span-4 gap-8 flex flex-col">
        <PropertyDetailSection
          title={t("sections.whereYouBe")}
          content={
            <PropertyMap
              coordinates={property.mapLocation.coordinates}
            />
          }
        />
        <PropertyDetailSection
          content={<PropertyAgentDetails agent={property.agent} />}
        />
      </div>
    </PropertyDetailContainer>
  );
};
