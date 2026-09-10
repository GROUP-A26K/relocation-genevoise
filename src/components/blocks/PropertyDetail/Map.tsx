import { useMemo } from 'react';
import { GoogleMapsEmbed } from '@next/third-parties/google';

import { Env } from '@/libs/Env';

import type { ICoordinates } from '@/models/Property';

interface IPropertyMapProps {
  coordinates: ICoordinates;
}

export function PropertyMap({ coordinates }: IPropertyMapProps) {
  const place = useMemo(
    () => `${coordinates.lat},${coordinates.lng}`,
    [coordinates]
  );

  return (
    <div className="h-[230px] w-full overflow-hidden rounded-2xl">
      <GoogleMapsEmbed
        apiKey={Env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        height={230}
        width="100%"
        mode="place"
        q={place}
      />
    </div>
  );
}
