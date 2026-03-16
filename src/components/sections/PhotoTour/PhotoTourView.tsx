import { PhotoTourSection } from "@/components/blocks/PhotoTour/PhotoTourSection";
import { IAreaPhotoTour } from "@/models/Property";

interface IPhotoTourViewProps {
  areas: IAreaPhotoTour[];
}

export const PhotoTourView = ({ areas }: IPhotoTourViewProps) => {
  return (
    <div className="flex flex-col gap-16">
      {areas.map((area, index) => (
        <PhotoTourSection key={index} area={area} index={index} />
      ))}
    </div>
  );
};
