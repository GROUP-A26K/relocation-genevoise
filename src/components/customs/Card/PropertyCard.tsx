"use client";

import Image from "next/image";
import { Link } from "@/libs/i18nNavigation";
import { PropertyFacility, IPropertyListing } from "@/models/Property";
import {
  formatAreaValue,
  formatFacilityValue,
} from "@/utils/format";
import { MapPin, Scaling, BedDouble, Bath } from "lucide-react";
import { useTranslations } from "next-intl";
import { PROPERTY_DEFAULT_CURRENCY } from "@/constants/property";
import { useExchangeRates } from "@/context/ExchangeRatesContext";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80";

const getFacilityByIcon = (
  facilities: PropertyFacility[],
  typeRoom: string,
): PropertyFacility | undefined => {
  return facilities.find((f) => f.typeRoom === typeRoom);
};

interface IPropertyCardProps extends IPropertyListing {
  displayCurrency?: string;
}

export const PropertyCard: React.FC<IPropertyCardProps> = ({
  title,
  href,
  price,
  listingType,
  rentPeriod,
  location,
  category,
  facilities,
  imageUrl,
  displayCurrency,
}) => {
  const t = useTranslations("Properties.card");
  const { convertFromCHF, getCurrencySymbol } = useExchangeRates();

  const currency = displayCurrency || PROPERTY_DEFAULT_CURRENCY;
  const convertedPrice = convertFromCHF(price, currency);
  const currencySymbol = getCurrencySymbol(currency);

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

  return (
    <Link href={href}>
      <article className="flex flex-col gap-5 items-start rounded-xl h-full cursor-pointer group">
        <Image
          alt={title}
          title={title}
          src={imageUrl || FALLBACK_IMAGE}
          width={640}
          height={250}
          className="aspect-video lg:h-[250px] h-[226px] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
        />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-2 items-center flex-wrap">
              <span
                className={`text-sm font-medium !leading-[1.3] px-3 py-1 rounded-[6px] w-fit ${
                  listingType === "sale"
                    ? "bg-yellow-50 text-yellow-800"
                    : "bg-blue-50 text-blue-500"
                }`}
              >
                {t(`listingType.${listingType}`)}
              </span>
              <span className="bg-grey-100 text-black-500 text-sm font-medium !leading-[1.3] px-3 py-1 rounded-[6px] w-fit">
                {category}
              </span>
            </div>

            <h3 className="text-h3 font-semibold text-black-500 !leading-[130%] truncate w-full">
              {title}
            </h3>

            <div className="flex flex-col gap-2 w-full">
              {location.name && (
                <div className="flex gap-1.5 items-center">
                  <MapPin className="!w-4 h-4 text-black-200" />
                  <span className="text-sm lg:text-p  font-normal text-black-200 !leading-[130%]">
                    {location.name}
                  </span>
                </div>
              )}

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
                      {bedValue} {t("bedroom")}
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
                      {bathValue} {t("bathroom")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-1 items-baseline">
            <span className="text-2xl lg:text-h2 font-semibold text-blue-500 !leading-[130%]">
              {currencySymbol}
              {convertedPrice.toLocaleString("en-US")}
              {listingType === "rent" && (
                <span className="text-sm lg:text-p font-semibold text-black-200 !leading-[130%]">
                  /{t(`rentPeriod.${rentPeriod}`)}
                </span>
              )}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
