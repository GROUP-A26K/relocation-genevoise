import { isNil } from 'lodash-es';

import type { IPropertyFacility, TPropertyPriceUnit } from '@/models/property';

export const formatFacilityValue = (facility: IPropertyFacility): string => {
  if (facility.valueType === 'number' && !isNil(facility.numberValue)) {
    return `${facility.numberValue}`;
  }

  if (facility.valueType === 'text' && facility.textValue) {
    return facility.textValue;
  }

  return '';
};

export const formatPriceUnit = (priceUnit: TPropertyPriceUnit): string => {
  return priceUnit;
};

export const formatAreaValue = (value: string): string => {
  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return numericValue.toLocaleString('en-US');
  }

  return value;
};
