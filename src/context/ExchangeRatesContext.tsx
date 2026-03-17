"use client";

import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CURRENCIES } from "@/constants/property";
import {
  ExchangeRates,
  FALLBACK_RATES,
  getCachedRates,
  setCachedRates,
} from "@/utils/exchangeRate";

interface ExchangeRatesContextValue {
  rates: ExchangeRates;
  /** Convert a CHF amount to the target currency using live rates */
  convertFromCHF: (chfAmount: number, currency: string) => number;
  /** Convert a display-currency amount back to CHF (for Sanity queries) */
  convertToCHF: (amount: number, currency: string) => number;
  getCurrencySymbol: (currency: string) => string;
}

const ExchangeRatesContext = createContext<ExchangeRatesContextValue>({
  rates: FALLBACK_RATES,
  convertFromCHF: (amount) => amount,
  convertToCHF: (amount) => amount,
  getCurrencySymbol: (currency) =>
    CURRENCIES.find((c) => c.value === currency)?.symbol ?? currency,
});

export const useExchangeRates = () => useContext(ExchangeRatesContext);

export const ExchangeRatesProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rates, setRates] = useState<ExchangeRates>(FALLBACK_RATES);

  useEffect(() => {
    // 1. Try cookie cache first
    const cached = getCachedRates();
    if (cached) {
      setRates(cached);
      return;
    }

    // 2. Fetch from our API route (server-cached for 30 days on the backend)
    fetch("/api/exchange-rates")
      .then((res) => res.json())
      .then((data: { rates: ExchangeRates }) => {
        setRates(data.rates);
        setCachedRates(data.rates);
      })
      .catch(() => {
        // Keep fallback rates on network error
      });
  }, []);

  const convertFromCHF = (chfAmount: number, currency: string): number => {
    const rate = rates[currency] ?? 1;
    return Math.round(chfAmount * rate);
  };

  const convertToCHF = (amount: number, currency: string): number => {
    const rate = rates[currency] ?? 1;
    return Math.round(amount / rate);
  };

  const getCurrencySymbol = (currency: string): string =>
    CURRENCIES.find((c) => c.value === currency)?.symbol ?? currency;

  return (
    <ExchangeRatesContext.Provider
      value={{ rates, convertFromCHF, convertToCHF, getCurrencySymbol }}
    >
      {children}
    </ExchangeRatesContext.Provider>
  );
};
