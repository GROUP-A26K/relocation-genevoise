"use client";

import Image from "next/image";
import { Link } from "@/libs/i18nNavigation";
import {
  PropertyFacility,
  PropertyListing,
  PropertyPriceUnit,
} from "@/models/Property";
import { MapPin, Scaling, BedDouble, Bath } from "lucide-react";
import { useLocale } from "next-intl";

const getFacilityByIcon = (
  facilities: PropertyFacility[],
  icon: string,
): PropertyFacility | undefined => {
  return facilities.find((f) => f.icon === icon);
};

const formatFacilityValue = (facility: PropertyFacility): string => {
  if (facility.valueType === "number" && facility.numberValue !== undefined) {
    return `${facility.numberValue}`;
  }
  if (facility.valueType === "text" && facility.textValue) {
    return facility.textValue;
  }
  return "";
};

const formatPriceUnit = (priceUnit: PropertyPriceUnit) => {
  if (priceUnit === "EUR") {
    return "€";
  }

  return priceUnit;
};

const formatAreaValue = (value: string) => {
  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return numericValue.toLocaleString("en-US");
  }

  return value;
};

export const PropertyCard: React.FC<PropertyListing> = ({
  title,
  href,
  price,
  priceUnit,
  rentPeriod,
  location,
  category,
  facilities,
  imageUrl,
}) => {
  const locale = useLocale();

  const areaFacility = getFacilityByIcon(facilities, "area");
  const bedroomFacility = getFacilityByIcon(facilities, "bedroom");
  const bathroomFacility = getFacilityByIcon(facilities, "bathroom");

  const areaValue = areaFacility ? formatFacilityValue(areaFacility) : null;
  const bedValue = bedroomFacility
    ? formatFacilityValue(bedroomFacility)
    : null;
  const bathValue = bathroomFacility
    ? formatFacilityValue(bathroomFacility)
    : null;

  const fallbackImage =
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

  return (
    <Link href={href}>
      <article className="flex flex-col gap-5 items-start rounded-xl h-full cursor-pointer group">
        <Image
          alt={title}
          title={title}
          src={imageUrl || fallbackImage}
          width={640}
          height={250}
          className="aspect-video lg:h-[250px] h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />

        <div className="flex flex-col gap-6 w-full">
          {/* Category + Title + Location + Facilities */}
          <div className="flex flex-col gap-3 w-full">
            {/* Category badge */}
            <span className="bg-grey-100 text-black-500 text-p font-normal !leading-[1.3] px-2.5 py-px rounded-[2px] w-fit">
              {category}
            </span>

            {/* Title */}
            <h3 className="text-h3 font-semibold text-black-500 !leading-[130%] truncate w-full">
              {title}
            </h3>

            {/* Location + Facilities */}
            <div className="flex flex-col gap-2 w-full">
              {/* Location */}
              {location.name && (
                <div className="flex gap-1.5 items-center">
                  <MapPin className="!w-4 h-4 text-black-200" />
                  <span className="text-sm lg:text-p  font-normal text-black-200 !leading-[130%]">
                    {location.name}
                  </span>
                </div>
              )}

              {/* Facilities row */}
              <div className="flex gap-3 items-center h-[21px]">
                {areaValue && (
                  <div className="flex gap-1.5 items-center">
                    <Scaling className="!w-4 h-4 text-black-200" />
                    <span className="text-sm lg:text-p  font-normal text-black-200 !leading-[130%]">
                      {formatAreaValue(areaValue)} m
                      <sup className="text-[10px]">2</sup>
                    </span>
                  </div>
                )}
                {areaValue && bedValue && (
                  <div className="w-px h-6 bg-grey-100" />
                )}
                {bedValue && (
                  <div className="flex gap-1.5 items-center">
                    <BedDouble className="!w-4 h-4 text-black-200" />
                    <span className="text-sm lg:text-p  font-normal text-black-200 !leading-[130%]">
                      {bedValue} {locale === "fr" ? "Ch" : "Bed"}
                    </span>
                  </div>
                )}
                {bedValue && bathValue && (
                  <div className="w-px h-6 bg-grey-100" />
                )}
                {bathValue && (
                  <div className="flex gap-1.5 items-center">
                    <Bath className="!w-4 h-4 text-black-200" />
                    <span className="text-sm lg:text-p  font-normal text-black-200 !leading-[130%]">
                      {bathValue} {locale === "fr" ? "SdB" : "Bath"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1 items-baseline">
            <span className="text-2xl lg:text-h2 font-semibold text-blue-500 !leading-[130%]">
              {formatPriceUnit(priceUnit)}
              {price}
              <span className="text-sm lg:text-p font-semibold text-blue-500 !leading-[130%]">
                /
                {locale === "fr"
                  ? rentPeriod === "year"
                    ? "an"
                    : "mois"
                  : rentPeriod === "year"
                    ? "year"
                    : "month"}
              </span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
