import { PropertyFacility, PropertyPriceUnit } from "@/models/Property";

export const formatFacilityValue = (facility: PropertyFacility): string => {
  if (facility.valueType === "number" && facility.numberValue !== undefined) {
    return `${facility.numberValue}`;
  }

  if (facility.valueType === "text" && facility.textValue) {
    return facility.textValue;
  }

  return "";
};

export const formatPriceUnit = (priceUnit: PropertyPriceUnit): string => {
  return priceUnit;
};

export const formatAreaValue = (value: string): string => {
  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return numericValue.toLocaleString("en-US");
  }

  return value;
};
