import { IAreaPhotoTour } from "@/models/Property";
import { ArrowLeftIcon, ChevronLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

interface IPropertySectionHeaderProps {
  areas: IAreaPhotoTour[];
  slug: string;
}

export async function PropertySectionHeader({
  areas,
  slug,
}: IPropertySectionHeaderProps) {
  const t = await getTranslations("PhotoTour");
  const locale = await getLocale();
  const title = t("title");
  const subheading = t("subheading");

  return (
    <div className="flex flex-col gap-8 lg:pb-16">
      <div className="flex flex-col items-start gap-3">
        <Link href={`/${locale}/properties/${slug}`} className="flex gap-2 items-center">
          <ChevronLeft width={18} height={18} className="text-yellow-600" />
          <p className="text-yellow-600 text-base font-semibold !leading[130%]">
            {title}
          </p>
        </Link>
        <h1 className="font-semibold text-3xl !leading[130%] text-black-500">
          {subheading}
        </h1>
      </div>

      <div className="hidden lg:grid xl:grid-cols-5 lg:grid-cols-4 gap-8 w-full">
        {areas.map((area, index) => (
          <a
            className="flex-shrink-0 flex flex-col gap-6"
            key={index}
            href={`#area-${index}`}
          >
            <div className="relative flex-shrink-0 aspect-[224.4/167] rounded-2xl overflow-hidden">
              <Image
                src={area.mainImageUrl}
                fill
                alt={area.title}
                title={area.title}
                sizes="(max-width:640px) 210px, (max-width:1280px) 210px, 224px"
              />
            </div>
            <h2 className="font-semibold text-black-500 !leading[130%] text-xl">
              {area.title}
            </h2>
          </a>
        ))}
      </div>
    </div>
  );
}
