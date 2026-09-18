'use client';

import { useMemo } from 'react';
import { Home, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Form } from '@/components/ui/form';
import Button from '@/components/common/Button';
import { RevealItem, RevealSection } from '@/components/common/Reveal';
import { usePropertySearchForm } from '@/features/property/propertySearchForm.hooks';
import {
  InputField,
  MultiSelectField,
  PriceRangeField,
  RoomsSelectField,
} from '@/components/common/Form';

import type { IPropertyCategory } from '@/models/property';
import type { TPropertySearchFormValues } from '@/features/property/property.types';

const FILTER_LABEL_CLASSNAME =
  'text-[14px] font-semibold text-black-500 leading-[130%]';

const FIELD_CLASSNAME = 'w-full lg:w-[320px] space-y-0';

const FIELD_INPUT_CLASSNAME =
  'h-10 bg-white border-grey-100 text-[14px] font-medium text-black-500 placeholder:text-black-50 leading-[130%]';

interface ISearchFiltersProps {
  categories: IPropertyCategory[];
}

const SearchFilters: React.FC<ISearchFiltersProps> = ({ categories }) => {
  const t = useTranslations('Properties');
  const { form, applyFilters } = usePropertySearchForm();

  const locationValue = form.watch('location');
  const selectedCategories = form.watch('categories');
  const categoryOptions = useMemo(() => {
    const options = categories.map((category) => ({
      value: category.categoryName,
      label: category.categoryName,
    }));
    const known = new Set(options.map((option) => option.value));

    selectedCategories.forEach((value) => {
      if (!known.has(value)) options.push({ value, label: value });
    });

    return options;
  }, [categories, selectedCategories]);

  const onSubmit = (values: TPropertySearchFormValues) => {
    applyFilters({
      location: values.location,
      priceRange: values.priceRange,
      currency: values.currency,
      categories: values.categories,
      rooms: values.rooms,
    });
  };

  return (
    <RevealSection
      trigger="load"
      className="z-10 flex items-start justify-center px-4 pb-12 lg:px-[48px] lg:pb-16 xl:px-[60px] 2xl:px-[100px]"
    >
      <RevealItem className="w-full max-w-[1240px] rounded-3xl bg-white px-4 pt-6 pb-4 shadow-[0px_2px_20px_0px_rgba(211,211,211,0.4)] lg:p-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-end gap-6 lg:flex-row lg:gap-5"
          >
            <InputField
              name="location"
              label={t('filters.location')}
              placeholder={t('filters.locationPlaceholder')}
              register={form.register}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              inputClassName={FIELD_INPUT_CLASSNAME}
              icon={<MapPin className="h-[18px] w-[18px]" />}
              onClear={
                locationValue ? () => form.setValue('location', '') : undefined
              }
            />

            <PriceRangeField
              label={t('filters.price')}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              triggerClassName={FIELD_INPUT_CLASSNAME}
              hideCurrency
            />

            <RoomsSelectField
              name="rooms"
              label={t('filters.rooms')}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              triggerClassName={FIELD_INPUT_CLASSNAME}
            />

            <MultiSelectField
              name="categories"
              label={t('filters.propertyType')}
              placeholder={t('filters.anyType')}
              options={categoryOptions}
              className={FIELD_CLASSNAME}
              labelClassName={FILTER_LABEL_CLASSNAME}
              triggerClassName={FIELD_INPUT_CLASSNAME}
              icon={<Home className="h-[18px] w-[18px]" />}
            />

            <Button
              as="solid"
              type="secondary"
              variant="md"
              className="max-md:mt-2 max-md:w-full"
            >
              {t('filters.searchButton')}
            </Button>
          </form>
        </Form>
      </RevealItem>
    </RevealSection>
  );
};

export { SearchFilters };
