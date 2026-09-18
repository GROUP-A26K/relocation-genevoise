'use client';

import { usePathname } from 'next/navigation';
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import {
  createFormDraftStore,
  type TFormDraftStore,
} from '@/features/formDraft/formDraft.store';

interface IFormDraftContext {
  store: TFormDraftStore;
  preserveForLanguageSwitch: (pathname: string) => void;
  cancelLanguageSwitch: () => void;
}

export const FormDraftContext = createContext<IFormDraftContext | null>(null);

export const FormDraftProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const languageSwitchPathRef = useRef<string | null>(null);
  const [scope, setScope] = useState(() => ({
    pathname,
    store: createFormDraftStore(),
  }));

  if (scope.pathname !== pathname) {
    // Replace the store before the destination's forms can restore old drafts.
    // Only the exact destination requested by the language switch may keep it.
    setScope({
      pathname,
      store:
        languageSwitchPathRef.current === pathname
          ? scope.store
          : createFormDraftStore(),
    });
  }

  useEffect(() => {
    languageSwitchPathRef.current = null;
  }, [pathname]);

  return (
    <FormDraftContext.Provider
      value={{
        store: scope.store,
        preserveForLanguageSwitch: (targetPathname) => {
          languageSwitchPathRef.current = targetPathname;
        },
        cancelLanguageSwitch: () => {
          languageSwitchPathRef.current = null;
        },
      }}
    >
      {children}
    </FormDraftContext.Provider>
  );
};

export const useFormDraftContext = () => {
  const context = useContext(FormDraftContext);
  if (!context) {
    throw new Error('Form drafts must be used inside FormDraftProvider');
  }

  return context;
};

export const useFormDraftStore = () => useFormDraftContext().store;
