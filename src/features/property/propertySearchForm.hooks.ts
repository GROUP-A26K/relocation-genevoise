'use client';

import { useLocale } from 'next-intl';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { usePropertyFilters } from '@/hooks/usePropertyFilters';
import { useFormDraft, useFormDraftRecord } from '@/features/formDraft';

import type { TPropertySearchFormValues } from './property.types';

export const usePropertySearchForm = () => {
  const locale = useLocale();
  const { formValues, filterAnchor, applyFilters } = usePropertyFilters();
  const draftRecord = useFormDraftRecord('property-search');
  const hasMatchingDraft = draftRecord?.meta?.urlAnchor === filterAnchor;
  const form = useForm<TPropertySearchFormValues>({
    defaultValues: formValues,
  });
  const previousAnchor = useRef(filterAnchor);

  useFormDraft('property-search', form, {
    meta: { urlAnchor: filterAnchor },
    restoreKey: locale,
    restore: (values) => (hasMatchingDraft ? values : formValues),
  });

  useEffect(() => {
    if (!hasMatchingDraft || previousAnchor.current !== filterAnchor) {
      form.reset(formValues);
    }

    previousAnchor.current = filterAnchor;
  }, [filterAnchor, form, formValues, hasMatchingDraft]);

  return { form, applyFilters };
};
