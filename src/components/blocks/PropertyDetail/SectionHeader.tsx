import { IAreaPhotoTour } from "@/models/Property";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

interface IPropertySectionHeaderProps {
  areas: IAreaPhotoTour[];
}

export async function PropertySectionHeader({ areas }: IPropertySectionHeaderProps) {
  const t = await getTranslations("PhotoTour");
  const title = t("title");
  const subheading = t("subheading");

  return (
    <div className="flex flex-col gap-8 lg:pb-16">
      <div className="flex flex-col items-start gap-3">
        <h1 className="text-yellow-600 text-sm font-semibold !leading[130%]">{title}</h1>
        <h2 className="font-semibold text-3xl !leading[130%] text-black-500">
          {subheading}
        </h2>
      </div>

      <div className="hidden lg:flex flex-wrap gap-6 w-full">
        {areas.map((area, index) => (
          <a
            className="flex-shrink-0 flex flex-col gap-6"
            key={index}
            href={`#area-${index}`}
          >
            <div className="relative flex-shrink-0 aspect-[224.4/167] rounded-2xl w-[210px] xl:w-[224px] overflow-hidden">
              <Image
                src={area.mainImageUrl}
                fill
                alt={`Thumbnail ${index}`}
                sizes="(max-width:640px) 210px, (max-width:1280px) 210px, 224px"
              />
            </div>
            <h4 className="font-semibold text-black-500 !leading[130%] text-xl">
              {area.title}
            </h4>
          </a>
        ))}
      </div>
    </div>
  );
}
