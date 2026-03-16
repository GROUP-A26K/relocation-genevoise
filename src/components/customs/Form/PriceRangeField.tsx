"use client";

import { FC, ReactNode, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import { PriceInputField } from "./PriceInputField";

const CURRENCIES = [
  { value: "EUR", symbol: "€" },
  { value: "USD", symbol: "$" },
  { value: "CHF", symbol: "Fr." },
] as const;

interface PriceRangeFieldProps {
  label?: string;
  placeholder?: string;
  minPriceName?: string;
  maxPriceName?: string;
  currencyName?: string;
  className?: string;
  labelClassName?: string;
  triggerClassName?: string;
  icon?: ReactNode;
}

const isPositiveNumber = (v: string) =>
  v === "" || (/^\d+(\.\d+)?$/.test(v) && Number(v) >= 0);

export const PriceRangeField: FC<PriceRangeFieldProps> = ({
  label,
  placeholder,
  minPriceName = "minPrice",
  maxPriceName = "maxPrice",
  currencyName = "currency",
  className,
  labelClassName,
  triggerClassName,
  icon,
}) => {
  const t = useTranslations("Properties");
  const { getValues, trigger, control } = useFormContext();

  const minPrice = useWatch({ name: minPriceName });
  const maxPrice = useWatch({ name: maxPriceName });
  const currency = useWatch({ name: currencyName });

  // Re-validate maxPrice whenever minPrice changes
  useEffect(() => {
    if (maxPrice) trigger(maxPriceName);
  }, [minPrice, maxPrice, maxPriceName, trigger]);

  const currencySymbol = CURRENCIES.find((c) => c.value === currency)?.symbol;

  const triggerText =
    minPrice || maxPrice
      ? `${minPrice || "0"} – ${maxPrice || "∞"}${currencySymbol ? ` ${currencySymbol}` : ""}`
      : placeholder;

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {label && (
        <span className={cn("text-sm !leading-[130%]", labelClassName)}>
          {label}
        </span>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              "relative flex items-center justify-between w-full rounded-full text-sm h-10",
              "border border-gray-200 bg-white px-3",
              "hover:border-black-50",
              "focus:outline-none focus:border-secondary-500 focus:ring-2 focus:ring-secondary-50",
              "[&[data-state=open]]:border-secondary-500 [&[data-state=open]]:ring-2 [&[data-state=open]]:ring-secondary-50",
              icon && "pl-10",
              triggerClassName,
            )}
          >
            {icon && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black-50 pointer-events-none">
                {icon}
              </span>
            )}
            <span
              className={cn(
                "truncate",
                !minPrice && !maxPrice && "text-black-50 font-medium",
              )}
            >
              {triggerText}
            </span>
            <ChevronDown className="w-4 h-4 text-black-50 shrink-0 ml-2" />
          </button>
        </PopoverTrigger>

        <PopoverContent
          className="p-3 rounded-2xl border-[#ededed]"
          align="start"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <div className="flex gap-2 items-start">
            <PriceInputField
              name={minPriceName}
              label={t("filters.minPrice")}
              placeholder="0"
              suffix={currencySymbol}
              className="flex-1 min-w-0 space-y-0"
              labelClassName="text-sm font-semibold text-black-500"
              rules={{
                validate: (v) =>
                  isPositiveNumber(v) || t("filters.priceInvalid"),
              }}
            />

            <PriceInputField
              name={maxPriceName}
              label={t("filters.maxPrice")}
              placeholder="∞"
              suffix={currencySymbol}
              className="flex-1 min-w-0 space-y-0"
              labelClassName="text-sm font-semibold text-black-500"
              rules={{
                validate: {
                  isNumber: (v) =>
                    isPositiveNumber(v) || t("filters.priceInvalid"),
                  minLessThanMax: (v) => {
                    const min = getValues(minPriceName);
                    if (!v || !min) return true;
                    return (
                      Number(v) > Number(min) || t("filters.minMaxInvalid")
                    );
                  },
                },
              }}
            />

            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold text-black-500">
                {t("filters.currency")}
              </span>
              <Controller
                control={control}
                name={currencyName}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value || undefined}
                  >
                    <SelectTrigger className="h-10 w-[72px] rounded-full border-[#ededed] text-sm font-medium text-black-500 shrink-0">
                      <SelectValue placeholder={t("filters.currency")} />
                    </SelectTrigger>
                    <SelectContent>
                      {CURRENCIES.map((c) => (
                        <SelectItem key={c.value} value={c.value}>
                          {c.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
