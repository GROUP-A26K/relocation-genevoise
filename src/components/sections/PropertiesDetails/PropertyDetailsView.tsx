'use client';
import { MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import { RevealItem } from '@/components/customs/Reveal';
import { PropertyMap } from '@/components/blocks/PropertyDetail/Map';
import { PropertyDetailTable } from '@/components/blocks/PropertyDetail/Table';
import { PropertyAgentDetails } from '@/components/blocks/PropertyDetail/AgentInfo';
import { PropertyDescription } from '@/components/blocks/PropertyDetail/Description';

import { PropertyDetailSection } from './PropertiesDetailSection';
import { PropertyDetailContainer } from './PropertyDetailContainer';
import {
  FacilityIconMap,
  SurroundingPlaceIconMap,
} from './PropertiesDetailIcon';

import type { PropertyDetail } from '@/models/Property';

interface IPropertyDetailViewProps {
  property: PropertyDetail;
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
              <span>
                {property.availability
                  ? t('status.available')
                  : t('status.notAvailable')}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`w-fit rounded-[6px] px-3 py-1 text-xs leading-[130%]! font-medium shadow-none ${
                    property.listingType === 'sale'
                      ? 'bg-yellow-50 text-yellow-800'
                      : 'bg-blue-50 text-blue-500'
                  }`}
                >
                  {t(`listingType.${property.listingType || 'rent'}`)}
                </span>
                <span className="w-fit rounded-[6px] bg-grey-100 px-3 py-1 text-xs leading-[130%]! font-medium text-black-500 shadow-none">
                  {property.category.categoryName}
                </span>
              </div>
            </div>
            <h1 className="text-3xl leading-[130%]! font-semibold tracking-normal text-primary-500">
              {property.title}
            </h1>
            <div className="flex gap-1.5 text-sm leading-[130%]! font-normal text-black-200">
              <MapPin className="h-4 w-4" />
              <p>{property.mapLocation.name}</p>
            </div>
          </div>
          <div className="items-baseline">
            <span className="py-0 text-3xl leading-[130%]! font-semibold text-blue-500">
              CHF{property.price}
            </span>
            {property.listingType !== 'sale' && (
              <span className="relative text-lg leading-[130%]! font-semibold text-black-200">
                {t(`rentPeriod.${property.rentPeriod || 'month'}`)}
              </span>
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
