"use client";

import { FC } from "react";
import { Home, MapPin } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

import Button from "@/components/customs/Button";
import {
  InputField,
  MultiSelectField,
  PriceRangeField,
} from "@/components/customs/Form";
import { Form } from "@/components/ui/form";
import { usePropertyFilters } from "@/hooks/usePropertyFilters";
import type { IPropertyCategory } from "@/models/Property";

interface ISearchFiltersProps {
  categories: IPropertyCategory[];
}

interface ISearchFiltersFormValues {
  location: string;
  priceRange: string;
  currency: string;
  categories: string[];
}

const FILTER_LABEL_CLASSNAME =
  "text-body font-semibold text-black-500 !leading-[130%]";

const FIELD_CLASSNAME = "w-full lg:w-[320px] space-y-0";

const FIELD_INPUT_CLASSNAME =
  "h-10 bg-white border-grey-100 text-small font-medium text-black-500 placeholder:text-black-50 !leading-[130%]";

const SearchFilters: FC<ISearchFiltersProps> = ({ categories }) => {
  const t = useTranslations("Properties");
  const { formValues, applyFilters } = usePropertyFilters();

  const form = useForm<ISearchFiltersFormValues>({
    values: formValues,
  });

  const locationValue = form.watch("location");

  const onSubmit = (values: ISearchFiltersFormValues) => {
    applyFilters({
      location: values.location,
      priceRange: values.priceRange,
      currency: values.currency,
      categories: values.categories,
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
              onClear={
                locationValue
                  ? () => form.setValue("location", "")
                  : undefined
              }
            />

            <PriceRangeField
              label={t("filters.price")}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              triggerClassName={FIELD_INPUT_CLASSNAME}
            />

            <MultiSelectField
              name="categories"
              label={t("filters.propertyType")}
              placeholder={t("filters.anyType")}
              options={categories.map((cat) => ({
                value: cat.categoryName,
                label: cat.categoryName,
              }))}
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
