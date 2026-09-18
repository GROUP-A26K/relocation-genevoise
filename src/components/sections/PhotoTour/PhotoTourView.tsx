import { PhotoTourSection } from './PhotoTourSection';

import type { IAreaPhotoTour } from '@/models/property';

interface IPhotoTourViewProps {
  areas: IAreaPhotoTour[];
  propertyTitle?: string;
}

export const PhotoTourView = ({
  areas,
  propertyTitle,
}: IPhotoTourViewProps) => {
  return (
    <div className="flex flex-col gap-16">
      {areas.map((area, index) => (
        <PhotoTourSection
          key={index}
          area={area}
          index={index}
          propertyTitle={propertyTitle}
        />
      ))}
    </div>
  );
};
