import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Section from '@/components/customs/Section';
import { Button } from '@/components/ui/button-custom';
import { PropertyCard } from '@/components/customs/Card';

import type { IPropertyListing } from '@/models/Property';

interface IPropertyDetailSimilarProps {
  relatedProperties: IPropertyListing[];
}

export async function PropertyDetailSimilar({
  relatedProperties,
}: IPropertyDetailSimilarProps) {
  const t = await getTranslations('PropertiesDetails');

  return (
    <Section>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex max-w-3xl flex-col gap-6">
          <div className="flex flex-col items-start gap-3">
            <p className="!leading[130%] text-sm font-semibold text-yellow-600">
              {t('similar.title')}
            </p>
            <h2 className="!leading[130%] text-3xl font-semibold text-black-500">
              {t('similar.subheading')}
            </h2>
          </div>

          <p className="!leading[130%] text-sm text-black-200">
            {t('similar.description')}
          </p>
        </div>

        <Link href="/properties">
          <Button className="rounded-full bg-black-500">
            {t('similar.viewAllButton')}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {relatedProperties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </Section>
  );
}
