import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/libs/i18nNavigation';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IAreaPhotoTour } from '@/models/property';

interface IPropertySectionHeaderProps {
  areas: IAreaPhotoTour[];
  slug: string;
  propertyTitle?: string;
}

export async function PropertySectionHeader({
  areas,
  slug,
  propertyTitle,
}: IPropertySectionHeaderProps) {
  const t = await getTranslations('PhotoTour');
  const imageT = await getTranslations('Images');
  const title = t('title');
  const subheading = t('subheading');

  return (
    <div className="flex flex-col gap-8 lg:pb-16">
      <RevealItem className="flex flex-col items-start gap-3">
        <Link
          href={{ pathname: '/properties/[slug]', params: { slug } }}
          className="flex items-center gap-2"
        >
          <ChevronLeft width={18} height={18} className="text-yellow-600" />
          <BodyText
            variant="md"
            className="leading-6 font-semibold text-yellow-600"
          >
            {title}
          </BodyText>
        </Link>
        <HeadingText as="h1" className="text-3xl leading-9 font-semibold">
          {subheading}
        </HeadingText>
      </RevealItem>

      <RevealItem className="hidden w-full gap-8 lg:grid lg:grid-cols-4 xl:grid-cols-5">
        {areas.map((area, index) => (
          <a
            className="flex shrink-0 flex-col gap-6"
            key={index}
            href={`#area-${index}`}
          >
            <div className="relative aspect-[224.4/167] shrink-0 overflow-hidden rounded-2xl">
              <Image
                src={area.mainImageUrl}
                placeholder={area.mainImageLqip ? 'blur' : 'empty'}
                blurDataURL={area.mainImageLqip}
                fill
                alt={imageT('property.photo', {
                  property: propertyTitle || imageT('property.listing'),
                  area: area.title || imageT('common.photo'),
                  index: String(index + 1),
                })}
                title={imageT('property.photo', {
                  property: propertyTitle || imageT('property.listing'),
                  area: area.title || imageT('common.photo'),
                  index: String(index + 1),
                })}
                sizes="(max-width:640px) 210px, (max-width:1280px) 210px, 224px"
              />
            </div>
            <HeadingText as="h2" className="text-xl leading-7 font-semibold">
              {area.title}
            </HeadingText>
          </a>
        ))}
      </RevealItem>
    </div>
  );
}
