import { cn } from "@/libs/utils";
import { useMemo } from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Env } from "@/libs/Env";

interface IPropertyMapProps {
  country: string;
  address: string;
};

export function PropertyMap({ country, address }: IPropertyMapProps) {
  const t = useTranslations("PropertiesDetails");
  const place = useMemo(() => `${address}, ${country}`, [address, country]);
  const mapLink = useMemo(
    () => `https://www.google.com/maps?q=${encodeURIComponent(place)}`,
    [place]
  );

  return (
    <div className="overflow-hidden rounded-2xl bg-gray-100">
      <div className="w-full h-[240px]">
        <GoogleMapsEmbed
          apiKey={Env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          height={240}
          width="100%"
          mode="place"
          q={place}
        />
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between p-6 gap-4">
        <div className="flex-1 min-w-0 w-full">
          <h3 className="text-lg font-semibold text-black-500 !leading-[130%]">{country}</h3>
          <p className="text-black-200 text-sm font-normal">{address}</p>
        </div>

        <Link
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "w-full lg:w-auto px-4 py-3 rounded-full whitespace-nowrap",
            "bg-yellow-500 hover:bg-yellow-400 active:bg-yellow-600",
            "font-semibold text-base !leading-[130%] text-black-500",
            "inline-flex items-center justify-center gap-2 transition-colors"
          )}
        >
          {t("map.viewOnMap")}
        </Link>
      </div>
    </div>
  );
}