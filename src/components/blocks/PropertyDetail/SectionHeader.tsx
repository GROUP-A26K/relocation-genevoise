import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';

import type { IAreaPhotoTour } from '@/models/Property';

interface IPropertySectionHeaderProps {
  areas: IAreaPhotoTour[];
  slug: string;
}

export async function PropertySectionHeader({
  areas,
  slug,
}: IPropertySectionHeaderProps) {
  const t = await getTranslations('PhotoTour');
  const locale = await getLocale();
  const title = t('title');
  const subheading = t('subheading');

  return (
    <div className="flex flex-col gap-8 lg:pb-16">
      <div className="flex flex-col items-start gap-3">
        <Link
          href={`/${locale}/properties/${slug}`}
          className="flex items-center gap-2"
        >
          <ChevronLeft width={18} height={18} className="text-yellow-600" />
          <p className="!leading[130%] text-base font-semibold text-yellow-600">
            {title}
          </p>
        </Link>
        <h1 className="!leading[130%] text-3xl font-semibold text-black-500">
          {subheading}
        </h1>
      </div>

      <div className="hidden w-full gap-8 lg:grid lg:grid-cols-4 xl:grid-cols-5">
        {areas.map((area, index) => (
          <a
            className="flex shrink-0 flex-col gap-6"
            key={index}
            href={`#area-${index}`}
          >
            <div className="relative aspect-[224.4/167] shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={area.mainImageUrl}
                fill
                alt={area.title}
                title={area.title}
                sizes="(max-width:640px) 210px, (max-width:1280px) 210px, 224px"
              />
            </div>
            <h2 className="!leading[130%] text-xl font-semibold text-black-500">
              {area.title}
            </h2>
          </a>
        ))}
      </div>
    </div>
  );
}
