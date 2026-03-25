import { useMemo } from "react";
import { GoogleMapsEmbed } from "@next/third-parties/google";

import { Env } from "@/libs/Env";
import { ICoordinates } from "@/models/Property";

interface IPropertyMapProps {
  coordinates: ICoordinates;
}

export function PropertyMap({ coordinates }: IPropertyMapProps) {
  const place = useMemo(
    () => `${coordinates.lat},${coordinates.lng}`,
    [coordinates],
  );

  return (
    <div className="w-full h-[230px] rounded-2xl overflow-hidden">
      <GoogleMapsEmbed
        apiKey={Env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        height={230}
        width="100%"
        mode="place"
        q={place}
      />
    </div>
  );
}
