"use client";

import { FC, useEffect } from "react";
import { CircleDollarSign, Home, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import Button from "@/components/customs/Button";
import { InputField, SelectField } from "@/components/customs/Form";
import { Form } from "@/components/ui/form";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import { PropertyCategory } from "@/models/Property";

interface Props {
  categories: PropertyCategory[];
}

interface SearchFiltersFormValues {
  location: string;
  priceRange: string;
  category: string;
}

const PRICE_RANGE_OPTIONS = [
  { value: "0-100", label: "$0 - $100" },
  { value: "100-200", label: "$100 - $200" },
  { value: "200-300", label: "$200 - $300" },
  { value: "300-500", label: "$300 - $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-2000", label: "$1,000 - $2,000" },
  { value: "2000-5000", label: "$2,000 - $5,000" },
] as const;

const getPriceRangeValue = (minPrice: string, maxPrice: string) => {
  if (!minPrice && !maxPrice) {
    return "";
  }

  return (
    PRICE_RANGE_OPTIONS.find(
      (option) => option.value === `${minPrice || "0"}-${maxPrice || "0"}`,
    )?.value || ""
  );
};

const parsePriceRange = (priceRange: string) => {
  if (!priceRange) {
    return { minPrice: "", maxPrice: "" };
  }

  const [minPrice = "", maxPrice = ""] = priceRange.split("-");

  return { minPrice, maxPrice };
};

const FILTER_LABEL_CLASSNAME =
  "text-body font-semibold text-black-500 !leading-[130%]";

const FIELD_CLASSNAME = "w-full lg:w-[320px] space-y-0";

const FIELD_INPUT_CLASSNAME =
  "h-10 bg-white border-grey-100 text-small font-medium text-black-500 placeholder:text-black-50 !leading-[130%]";

const SearchFilters: FC<Props> = ({ categories }) => {
  const t = useTranslations("Properties");
  const {
    filterLocation,
    filterCategory,
    filterMinPrice,
    filterMaxPrice,
    applyFilters,
  } = usePropertyFilters();

  const form = useForm<SearchFiltersFormValues>({
    defaultValues: {
      location: filterLocation,
      priceRange: getPriceRangeValue(filterMinPrice, filterMaxPrice),
      category: filterCategory,
    },
  });

  useEffect(() => {
    form.reset({
      location: filterLocation,
      priceRange: getPriceRangeValue(filterMinPrice, filterMaxPrice),
      category: filterCategory,
    });
  }, [filterCategory, filterLocation, filterMaxPrice, filterMinPrice, form]);

  const onSubmit = (values: SearchFiltersFormValues) => {
    const { minPrice, maxPrice } = parsePriceRange(values.priceRange);

    applyFilters({
      location: values.location,
      category: values.category,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div className="flex items-start justify-center 2xl:px-[100px] xl:px-[60px] lg:px-[48px] px-4 pb-12 lg:pb-16 z-10">
      <div className="bg-white rounded-3xl shadow-[0px_2px_20px_0px_rgba(211,211,211,0.4)] pt-6 pb-4 px-4 lg:p-8 w-full max-w-[1240px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col lg:flex-row gap-6 lg:gap-5 items-end"
          >
            <InputField
              name="location"
              label={t("filters.location")}
              placeholder={t("filters.locationPlaceholder")}
              register={form.register}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              inputClassName={FIELD_INPUT_CLASSNAME}
              icon={<MapPin className="w-[18px] h-[18px]" />}
            />

            <SelectField
              name="priceRange"
              label={t("filters.price")}
              placeholder={t("filters.choosePriceRange")}
              options={PRICE_RANGE_OPTIONS.map((option) => ({
                value: option.value,
                label: option.label,
              }))}
              register={form.register}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              triggerClassName={FIELD_INPUT_CLASSNAME}
              icon={<CircleDollarSign className="w-[18px] h-[18px]" />}
            />

            <SelectField
              name="category"
              label={t("filters.propertyType")}
              placeholder={t("filters.chooseType")}
              options={categories.map((cat) => ({
                value: cat.categoryName,
                label: cat.categoryName,
              }))}
              register={form.register}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              triggerClassName={FIELD_INPUT_CLASSNAME}
              icon={<Home className="w-[18px] h-[18px]" />}
            />

            <Button
              as="solid"
              type="secondary"
              variant="md"
              className="max-md:w-full max-md:mt-2"
            >
              {t("filters.searchButton")}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export { SearchFilters };
