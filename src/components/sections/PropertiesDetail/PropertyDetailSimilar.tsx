'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import Section from '@/components/common/Section';
import { Button } from '@/components/ui/button-custom';
import { PropertyCard } from '@/components/common/Card';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';

import type { IPropertyListing } from '@/models/property';

interface IPropertyDetailSimilarProps {
  relatedProperties: IPropertyListing[];
}

export function PropertyDetailSimilar({
  relatedProperties,
}: IPropertyDetailSimilarProps) {
  const t = useTranslations('PropertiesDetails');

  return (
    <Section>
      <RevealItem className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-6">
          <div className="flex flex-col items-start gap-3">
            <BodyText
              variant="sm"
              className="leading-5 font-semibold text-yellow-600"
            >
              {t('similar.title')}
            </BodyText>
            <HeadingText as="h2" className="text-3xl leading-9 font-semibold">
              {t('similar.subheading')}
            </HeadingText>
          </div>

          <BodyText variant="sm" className="leading-5 font-[number:inherit]">
            {t('similar.description')}
          </BodyText>
        </div>

        <Link href="/properties">
          <Button className="rounded-full bg-black-500">
            {t('similar.viewAllButton')}
          </Button>
        </Link>
      </RevealItem>

      <RevealItem className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {relatedProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </RevealItem>
    </Section>
  );
}
