'use client';

import { useForm } from 'react-hook-form';
import { Home, MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Form } from '@/components/ui/form';
import Button from '@/components/customs/Button';
import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import {
  InputField,
  MultiSelectField,
  PriceRangeField,
  RoomsSelectField,
} from '@/components/customs/Form';

import type { FC } from 'react';
import type { IPropertyCategory } from '@/models/Property';

interface ISearchFiltersProps {
  categories: IPropertyCategory[];
}

interface ISearchFiltersFormValues {
  location: string;
  priceRange: string;
  currency: string;
  categories: string[];
  rooms: string;
}

const FILTER_LABEL_CLASSNAME =
  'text-body font-semibold text-black-500 leading-[130%]!';

const FIELD_CLASSNAME = 'w-full lg:w-[320px] space-y-0';

const FIELD_INPUT_CLASSNAME =
  'h-10 bg-white border-grey-100 text-small font-medium text-black-500 placeholder:text-black-50 leading-[130%]!';

const SearchFilters: FC<ISearchFiltersProps> = ({ categories }) => {
  const t = useTranslations('Properties');
  const { formValues, applyFilters } = usePropertyFilters();

  const form = useForm<ISearchFiltersFormValues>({
    values: formValues,
  });

  const locationValue = form.watch('location');

  const onSubmit = (values: ISearchFiltersFormValues) => {
    applyFilters({
      location: values.location,
      priceRange: values.priceRange,
      currency: values.currency,
      categories: values.categories,
      rooms: values.rooms,
    });
  };

  return (
    <div className="z-10 flex items-start justify-center px-4 pb-12 lg:px-[48px] lg:pb-16 xl:px-[60px] 2xl:px-[100px]">
      <div className="w-full max-w-[1240px] rounded-3xl bg-white px-4 pt-6 pb-4 shadow-[0px_2px_20px_0px_rgba(211,211,211,0.4)] lg:p-8">
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
              options={categories.map((cat) => ({
                value: cat.categoryName,
                label: cat.categoryName,
              }))}
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
      </div>
    </div>
  );
};

export { SearchFilters };
