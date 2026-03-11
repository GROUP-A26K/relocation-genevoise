'use client';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { PropertyDetailContainer } from "./PropertyDetailContainer";
import { PropertyDetailSection } from "./PropertiesDetailSection";
import { PropertyDetailTable } from "@/components/blocks/PropertyDetail/Table";
import { PropertyDescription } from "@/components/blocks/PropertyDetail/Description";
import { PropertyMap } from "@/components/blocks/PropertyDetail/Map";
import { PropertyAgentDetails } from "@/components/blocks/PropertyDetail/AgentInfo";
import {
  SquareDashed,
  DoorOpen,
  Bed,
  Bath,
  Trees,
  Sofa,
  Building2,
  MapPin
} from "lucide-react";
import { Property } from "@/types";

const iconMap: Record<string, React.ComponentType> = {
  "Area": SquareDashed,
  "Room": DoorOpen,
  "Bedroom": Bed,
  "Bathroom": Bath,
  "Outdoor space": Trees,
  "Furnished": Sofa,
  "Floor": Building2,
};

interface IPropertyDetailViewProps {
  property: Property;
}


export const PropertyDetailView = ({ property }: IPropertyDetailViewProps) => {
  const t = useTranslations("PropertiesDetails");
  const [tableColumns, setTableColumns] = useState({ facilities: 3, surrounding: 2 });

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

  const facilityItems = property.facilities.map(item => ({
    label: item.type,
    value: typeof item.value === "boolean" ? (item.value ? "Yes" : "No") : item.value,
    unit: item.unit,
    icon: item.type,
  }));

  const surroundingItems = property.surroundings.map(item => ({
    label: item.type,
    value: item.distance,
    unit: item.unit,
    icon: item.type,
  }));

  return (
    <PropertyDetailContainer>
      <div className="lg:col-span-6 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-green-500 border-[3px] border-green-200"></span>
              <span>{property.status}</span>
              <Badge 
                className="bg-blue-50 hover:bg-blue-50 text-blue-500 shadow-none text-xs !leading-[130%] font-normal"
              >
                {property.type}
              </Badge>
            </div>
            <h2 className="font-semibold text-3xl !leading-[130%] tracking-normal text-primary-500">
              {property.title}
            </h2>
            <div className="flex gap-1.5 font-normal text-black-200 !leading-[130%] text-sm">
              <MapPin className="w-4 h-4" />
              <p>{property.location.city}, {property.location.city}</p>
            </div>
          </div>
          <div className="items-baseline">
            <span className="font-bold text-blue-500 text-5xl !leading-[130%] py-0">${property.price}</span>
            <span className="font-semibold text-black-200 !leading-[130%] text-lg relative">{t("priceUnit")}</span>
          </div>
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.facilities")}
            content={
              <PropertyDetailTable items={facilityItems} iconMap={iconMap} columns={tableColumns.facilities}/>
            }
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.description")}
            content={
              <PropertyDescription content={property.description}/>
            }
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.surrounding")}
            content={
              <PropertyDetailTable items={surroundingItems} iconMap={iconMap} columns={tableColumns.surrounding}/>
            }
          />
        </div>
      </div>
      <div className="w-full lg:col-span-4 gap-8 flex flex-col">
        <PropertyDetailSection
          title={t("sections.whereYouBe")}
          content={
            <PropertyMap country={property.location.country} address={property.location.full}/>
          }
        />
        <PropertyDetailSection
          title={t("sections.contactAgent")}
          content={
            <PropertyAgentDetails {...property.agent}/>
          }
        />
      </div>
    </PropertyDetailContainer>
  )
};