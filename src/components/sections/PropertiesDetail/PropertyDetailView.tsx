'use client';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/libs/utils';
import { RevealItem } from '@/components/common/Reveal';
import BodyText from '@/components/common/Text/BodyText';
import HeadingText from '@/components/common/Text/HeadingText';
import { PropertyMap } from '@/components/sections/PropertiesDetail/Block/PropertyMap';
import { PropertyDetailTable } from '@/components/sections/PropertiesDetail/Block/PropertyDetailTable';
import { PropertyDescription } from '@/components/sections/PropertiesDetail/Block/PropertyDescription';
import { PropertyAgentDetails } from '@/components/sections/PropertiesDetail/Block/PropertyAgentDetails';

import { PropertyDetailSection } from './PropertyDetailSection';
import { PropertyDetailContainer } from './PropertyDetailContainer';
import { FacilityIconMap, SurroundingPlaceIconMap } from './constants';

import type { IPropertyDetail } from '@/models/property';

interface IPropertyDetailViewProps {
  property: IPropertyDetail;
}

export const PropertyDetailView = ({ property }: IPropertyDetailViewProps) => {
  const t = useTranslations('PropertiesDetails');
  const [tableColumns, setTableColumns] = useState({
    facilities: 3,
    surrounding: 2,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setTableColumns({ facilities: 1, surrounding: 1 });
      } else {
        setTableColumns({ facilities: 3, surrounding: 2 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const facilityItems = property.facilities.map((item) => ({
    label: item.name,
    value:
      item.valueType === 'none'
        ? undefined
        : (item.numberValue ?? item.textValue),
    unit:
      item.valueType !== 'none' && item.typeRoom === 'area' ? 'm²' : undefined,
    icon: item.typeRoom,
  }));

  const surroundingItems = property.surroundingPlaces.map((item) => ({
    label: item.name,
    value: item.distance,
    icon: item.icon,
  }));

  return (
    <PropertyDetailContainer>
      <div className="flex flex-col gap-12 lg:col-span-8 lg:gap-16">
        <RevealItem className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`h-4 w-4 rounded-full ${property.availability ? 'border-[3px] border-green-200 bg-green-500' : 'border-[3px] border-grey-100 bg-grey-300'}`}
              />
              <BodyText
                asChild
                className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit"
              >
                <span>
                  {property.availability
                    ? t('status.available')
                    : t('status.notAvailable')}
                </span>
              </BodyText>
              <div className="flex items-center gap-2">
                <BodyText
                  variant="xs"
                  asChild
                  className={cn(
                    `w-fit rounded-[6px] px-3 py-1 text-xs leading-[130%] font-medium shadow-none ${
                      property.listingType === 'sale'
                        ? 'bg-yellow-50 text-yellow-800'
                        : 'bg-blue-50 text-blue-500'
                    }`
                  )}
                >
                  <span>
                    {t(`listingType.${property.listingType || 'rent'}`)}
                  </span>
                </BodyText>
                <BodyText
                  variant="xs"
                  asChild
                  className="w-fit rounded-[6px] bg-grey-100 px-3 py-1 font-medium text-black-500 shadow-none"
                >
                  <span>{property.category.categoryName}</span>
                </BodyText>
              </div>
            </div>
            <HeadingText
              as="h1"
              className="text-3xl font-semibold tracking-normal text-primary-500"
            >
              {property.title}
            </HeadingText>
            <div className="flex gap-1.5 text-sm leading-[130%] font-normal text-black-200">
              <MapPin className="h-4 w-4" />
              <BodyText className="text-[length:inherit] leading-[inherit] font-[number:inherit] text-inherit">
                {property.mapLocation.name}
              </BodyText>
            </div>
          </div>
          <div className="items-baseline">
            <BodyText
              asChild
              className="py-0 text-3xl font-semibold text-blue-500"
            >
              <span>CHF{property.price}</span>
            </BodyText>
            {property.listingType !== 'sale' && (
              <BodyText variant="lg" asChild className="relative font-semibold">
                <span>{t(`rentPeriod.${property.rentPeriod || 'month'}`)}</span>
              </BodyText>
            )}
          </div>
        </RevealItem>
        <div>
          <PropertyDetailSection
            title={t('sections.facilities')}
            content={
              <PropertyDetailTable
                items={facilityItems}
                iconMap={FacilityIconMap}
                columns={tableColumns.facilities}
              />
            }
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t('sections.description')}
            content={<PropertyDescription content={property.description} />}
          />
        </div>
        <div>
          <PropertyDetailSection
            title={t('sections.surrounding')}
            content={
              <PropertyDetailTable
                items={surroundingItems}
                iconMap={SurroundingPlaceIconMap}
                columns={tableColumns.surrounding}
              />
            }
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 lg:col-span-4">
        <PropertyDetailSection
          title={t('sections.whereYouBe')}
          content={
            <PropertyMap coordinates={property.mapLocation.coordinates} />
          }
        />
        <PropertyDetailSection
          content={<PropertyAgentDetails agent={property.agent} />}
        />
      </div>
    </PropertyDetailContainer>
  );
};
