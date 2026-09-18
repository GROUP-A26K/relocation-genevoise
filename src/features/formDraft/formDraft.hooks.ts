'use client';

import { useStore } from 'zustand';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  useFormState,
  type FieldPath,
  type UseFormReturn,
} from 'react-hook-form';

import { useFormDraftStore } from '@/components/providers/FormDraftProvider';

import type {
  IFormDraftRecord,
  IFormDraftSubmission,
  TFormDraftKey,
  TFormDraftMeta,
  TFormDraftValues,
} from './formDraft.types';

interface IUseFormDraftOptions<K extends TFormDraftKey> {
  meta?: TFormDraftMeta<K>;
  restore?: (values: TFormDraftValues<K>) => TFormDraftValues<K>;
  restoreKey?: string;
}

export const useFormDraftRecord = <K extends TFormDraftKey>(key: K) => {
  const store = useFormDraftStore();

  return useStore(store, (state) =>
    state.drafts[key]
      ? (state.drafts[key] as IFormDraftRecord<
          TFormDraftValues<K>,
          TFormDraftMeta<K>
        >)
      : undefined
  );
};

export const useFormDraft = <K extends TFormDraftKey>(
  key: K,
  form: UseFormReturn<TFormDraftValues<K>>,
  options: IUseFormDraftOptions<K> = {}
) => {
  const { restoreKey } = options;
  const store = useFormDraftStore();
  const { errors } = useFormState({ control: form.control });
  const activeStoreRef = useRef(store);
  const errorFields = Object.keys(errors);
  const errorFieldsKey = errorFields.join('|');
  const errorFieldsRef = useRef(errorFields);
  const restoreRef = useRef(options.restore);
  const metaRef = useRef(options.meta);
  const isResettingRef = useRef(false);
  const isMountedRef = useRef(false);
  const hadDraftRef = useRef(false);
  const hasDraft = useStore(store, (state) => Boolean(state.drafts[key]));

  errorFieldsRef.current = errorFields;
  activeStoreRef.current = store;
  restoreRef.current = options.restore;
  metaRef.current = options.meta;

  const resetForm = useCallback(() => {
    isResettingRef.current = true;
    form.reset();
    isResettingRef.current = false;
  }, [form]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const draft = store.getState().getDraft(key);

    // Restore first so the initial reset is not saved as an empty draft.
    if (draft) {
      const restoredValues = restoreRef.current
        ? restoreRef.current(draft.values)
        : draft.values;

      form.reset(restoredValues, { keepDefaultValues: true });

      if (draft.errorFields.length > 0) {
        void form.trigger(
          draft.errorFields as FieldPath<TFormDraftValues<K>>[]
        );
      }
    }

    const subscription = form.subscribe({
      formState: { values: true },
      callback: ({ values }) => {
        // A successful submit reset must not create a new empty draft.
        if (isResettingRef.current) return;

        store
          .getState()
          .setDraft(key, values, errorFieldsRef.current, metaRef.current);
      },
    });

    return subscription;
  }, [form, key, restoreKey, store]);

  useEffect(() => {
    const draft = store.getState().getDraft(key);
    if (draft) {
      store.getState().updateErrorFields(key, errorFieldsRef.current);
    }
  }, [errorFieldsKey, key, store]);

  useEffect(() => {
    if (hadDraftRef.current && !hasDraft && isMountedRef.current) {
      resetForm();
    }

    hadDraftRef.current = hasDraft;
  }, [hasDraft, resetForm]);

  return useMemo(
    () => ({
      beginSubmission: (
        values: TFormDraftValues<K>
      ): IFormDraftSubmission<K> => ({
        key,
        values,
        revision: store
          .getState()
          .setDraft(key, values, errorFieldsRef.current, metaRef.current),
      }),
      completeSubmission: (submission: IFormDraftSubmission<K>) => {
        // Only the request that submitted the latest draft may clear it.
        const cleared = store
          .getState()
          .clearDraftIfRevision(submission.key, submission.revision);

        if (
          cleared &&
          isMountedRef.current &&
          activeStoreRef.current === store
        ) {
          hadDraftRef.current = false;
          resetForm();
        }

        return cleared;
      },
      clearDraft: () => {
        store.getState().clearDraft(key);
      },
    }),
    [key, resetForm, store]
  );
};
