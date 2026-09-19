import { createStore, type StoreApi } from 'zustand/vanilla';

import type {
  IFormDraftRecord,
  TFormDraftKey,
  TFormDraftMeta,
  TFormDraftValues,
} from './formDraft.types';

interface IFormDraftState {
  drafts: Record<string, IFormDraftRecord>;
  revisions: Record<string, number>;
  setDraft: <K extends TFormDraftKey>(
    key: K,
    values: TFormDraftValues<K>,
    errorFields: string[],
    meta?: TFormDraftMeta<K>
  ) => number;
  updateErrorFields: (key: TFormDraftKey, errorFields: string[]) => void;
  clearDraft: (key: TFormDraftKey) => void;
  clearDraftIfRevision: (key: TFormDraftKey, revision: number) => boolean;
  getDraft: <K extends TFormDraftKey>(
    key: K
  ) => IFormDraftRecord<TFormDraftValues<K>, TFormDraftMeta<K>> | undefined;
}

export type TFormDraftStore = StoreApi<IFormDraftState>;

export const createFormDraftStore = (): TFormDraftStore =>
  createStore<IFormDraftState>((set, get) => ({
    drafts: {},
    revisions: {},
    setDraft: (key, values, errorFields, meta) => {
      const revision = (get().revisions[key] ?? 0) + 1;

      set((state) => ({
        drafts: {
          ...state.drafts,
          [key]: { values, errorFields, meta, revision },
        },
        revisions: { ...state.revisions, [key]: revision },
      }));

      return revision;
    },
    updateErrorFields: (key, errorFields) => {
      set((state) => {
        const current = state.drafts[key];
        if (!current) return state;

        return {
          drafts: {
            ...state.drafts,
            [key]: { ...current, errorFields },
          },
        };
      });
    },
    clearDraft: (key) => {
      set((state) => {
        if (!state.drafts[key]) return state;

        const drafts = { ...state.drafts };
        delete drafts[key];
        return { drafts };
      });
    },
    clearDraftIfRevision: (key, revision) => {
      const current = get().drafts[key];
      if (!current || current.revision !== revision) return false;

      get().clearDraft(key);
      return true;
    },
    getDraft: <K extends TFormDraftKey>(key: K) =>
      get().drafts[key] as
        IFormDraftRecord<TFormDraftValues<K>, TFormDraftMeta<K>> | undefined,
  }));
