'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Clock, MapPin, Scaling, BedDouble, Bath } from 'lucide-react';

import { cn } from '@/libs/utils';
import { Link } from '@/libs/i18nNavigation';
import { PROPERTY_DEFAULT_CURRENCY } from '@/constants/property';
import { useExchangeRates } from '@/context/ExchangeRatesContext';
import { formatAreaValue, formatFacilityValue } from '@/utils/format';

import type { PropertyFacility, IPropertyListing } from '@/models/Property';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80';

const getFacilityByIcon = (
  facilities: PropertyFacility[],
  typeRoom: string
): PropertyFacility | undefined => {
  return facilities.find((f) => f.typeRoom === typeRoom);
};

interface IPropertyCardProps extends IPropertyListing {
  displayCurrency?: string;
}

export const PropertyCard: React.FC<IPropertyCardProps> = ({
  title,
  href,
  price,
  listingType,
  rentPeriod,
  location,
  category,
  facilities,
  imageUrl,
  availability,
  displayCurrency,
}) => {
  const t = useTranslations('Properties.card');
  const { convertFromCHF, getCurrencySymbol } = useExchangeRates();

  const currency = displayCurrency || PROPERTY_DEFAULT_CURRENCY;
  const convertedPrice = convertFromCHF(price, currency);
  const currencySymbol = getCurrencySymbol(currency);

  const areaFacility = getFacilityByIcon(facilities, 'area');
  const bedroomFacility = getFacilityByIcon(facilities, 'bedroom');
  const bathroomFacility = getFacilityByIcon(facilities, 'bathroom');

  const areaValue = areaFacility ? formatFacilityValue(areaFacility) : null;
  const bedValue = bedroomFacility
    ? formatFacilityValue(bedroomFacility)
    : null;
  const bathValue = bathroomFacility
    ? formatFacilityValue(bathroomFacility)
    : null;

  const isUnavailable = availability === false;

  return (
    <Link href={href}>
      <article className="group flex h-full cursor-pointer flex-col items-start gap-5 rounded-xl">
        <div className="relative w-full">
          <Image
            alt={title}
            title={title}
            src={imageUrl || FALLBACK_IMAGE}
            width={392}
            height={250}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 392px"
            className={cn('w-full rounded-2xl bg-gray-100 object-cover', {
              'opacity-90': isUnavailable,
            })}
          />
          {isUnavailable && (
            <>
              <div className="absolute inset-0 rounded-2xl bg-white/30" />
              <div className="absolute top-4 left-4">
                <span className="flex items-center gap-1 rounded-[6px] border border-grey-200 bg-white px-2.5 py-1 text-sm leading-[1.3]! font-medium text-black-500">
                  <Clock
                    className="h-3.5 w-3.5 text-black-200"
                    strokeWidth={2.8}
                  />
                  {t('offMarket')}
                </span>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`w-fit rounded-[6px] px-3 py-1 text-sm leading-[1.3]! font-medium ${
                  listingType === 'sale'
                    ? 'bg-yellow-50 text-yellow-800'
                    : 'bg-blue-50 text-blue-500'
                }`}
              >
                {t(`listingType.${listingType}`)}
              </span>
              <span className="w-fit rounded-[6px] bg-grey-100 px-3 py-1 text-sm leading-[1.3]! font-medium text-black-500">
                {category}
              </span>
            </div>

            <h3 className="w-full truncate text-h3 leading-[130%]! font-semibold text-black-500">
              {title}
            </h3>

            <div className="flex w-full flex-col gap-2">
              {location.name && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4! text-black-200" />
                  <span className="text-sm leading-[130%]! font-normal text-black-200 lg:text-p">
                    {location.name}
                  </span>
                </div>
              )}

              <div className="flex h-[21px] items-center gap-3">
                {areaValue && (
                  <div className="flex items-center gap-1.5">
                    <Scaling className="h-4 w-4! text-black-200" />
                    <span className="text-sm leading-[130%]! font-normal text-black-200 lg:text-p">
                      {formatAreaValue(areaValue)} m
                      <sup className="text-[10px]">2</sup>
                    </span>
                  </div>
                )}
                {areaValue && bedValue && (
                  <div className="h-6 w-px bg-grey-100" />
                )}
                {bedValue && (
                  <div className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4! text-black-200" />
                    <span className="text-sm leading-[130%]! font-normal text-black-200 lg:text-p">
                      {bedValue} {t('bedroom')}
                    </span>
                  </div>
                )}
                {bedValue && bathValue && (
                  <div className="h-6 w-px bg-grey-100" />
                )}
                {bathValue && (
                  <div className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4! text-black-200" />
                    <span className="text-sm leading-[130%]! font-normal text-black-200 lg:text-p">
                      {bathValue} {t('bathroom')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-baseline gap-1">
            <span
              className={`text-2xl leading-[130%]! font-semibold lg:text-h2 ${isUnavailable ? 'text-black-200' : 'text-blue-500'}`}
            >
              {currencySymbol}
              {convertedPrice.toLocaleString('en-US')}
              {listingType === 'rent' && (
                <span className="text-sm leading-[130%]! font-semibold text-black-200 lg:text-p">
                  /{t(`rentPeriod.${rentPeriod}`)}
                </span>
              )}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};
