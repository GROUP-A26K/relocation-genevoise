'use client';
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { PropertyDetailContainer } from "./PropertyDetailContainer";
import { PropertyDetailSection } from "./PropertiesDetailSection";
import { 
  PropertyDetailTable, 
  PropertyDescription, 
  PropertyMap,
  PropertyAgentDetails,
} from "@/components/blocks/PropertyDetail";
import { MapPin } from "lucide-react";

import {
  SquareDashed,
  DoorOpen,
  Bed,
  Bath,
  Trees,
  Sofa,
  Building2,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType> = {
  "Area": SquareDashed,
  "Room": DoorOpen,
  "Bedroom": Bed,
  "Bathroom": Bath,
  "Outdoor space": Trees,
  "Furnished": Sofa,
  "Floor": Building2,
};

export const PropertyDetailView = () => {
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

  const items = [
    {
      label: "Area",
      value: "200",
      unit: "m²",
    },
    {
      label: "Room",
      value: "5",

    },
    {
      label: "Bedroom",
      value: "2",
    },
    {
      label: "Bathroom",
      value: "2",
    },
    {
      label: "Outdoor space",
      value: "",
    },
    {
      label: "Furnished",
      value: "Full",
    },
    {
      label: "Floor",
      value: "2",
    },
  ].map(item => ({
    ...item,
    icon: item.label,
  }));

  const description = `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
    exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
    mollit anim id est laborum.`;



  return (
    <PropertyDetailContainer>
      <div className="lg:col-span-6 flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-green-500 border-[3px] border-green-200"></span>
              <span>Available now</span>
              <Badge 
                className="bg-blue-50 hover:bg-blue-50 text-blue-500 shadow-none text-xs !leading-[130%] font-normal"
              >
                Apartment
              </Badge>
            </div>
            <h2 className="font-semibold text-3xl !leading-[130%] tracking-normal text-primary-500">
              Apartment – Spacious & Elegant Urban Living For Rent
            </h2>
            <div className="flex gap-1.5 font-normal text-black-200 !leading-[130%] text-sm">
              <MapPin className="w-4 h-4" />
              <p>Chem. des Sports 16, 1203 Genève, Switzerland</p>
            </div>
          </div>
          <div className="items-baseline">
            <span className="font-bold text-blue-500 text-5xl !leading-[130%] py-0">$1200</span>
            <span className="font-semibold text-black-200 !leading-[130%] text-lg relative">{t("priceUnit")}</span>
          </div>
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.facilities")}
            content={
              <PropertyDetailTable items={items} iconMap={iconMap} columns={tableColumns.facilities}/>
            }
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.description")}
            content={
              <PropertyDescription content={description}/>
            }
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t("sections.surrounding")}
            content={
              <PropertyDetailTable items={items} iconMap={iconMap} columns={tableColumns.surrounding}/>
            }
          />
        </div>
      </div>
      <div className="w-full lg:col-span-4 gap-8 flex flex-col">
        <PropertyDetailSection
          title={t("sections.whereYouBe")}
          content={
            <PropertyMap country = "Gevene, Switzerland" address = "Chem. des Sports 16, 1203 Genève, Switzerland"/>
          }
        />
        <PropertyDetailSection
          title={t("sections.contactAgent")}
          content={
            <PropertyAgentDetails 
              name="John Doe" 
              phone="+41791234567" 
              avatar="https://randomuser.me/api/portraits/men/75.jpg"
            />
          }
        />
      </div>
    </PropertyDetailContainer>
  )
};