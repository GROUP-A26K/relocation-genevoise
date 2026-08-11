import "server-only";

import { ExchangeRates, FALLBACK_RATES } from "./exchangeRate";

// Frankfurter.app: free, no API key, uses European Central Bank data
const FRANKFURTER_URL =
  "https://api.frankfurter.app/latest?base=CHF&symbols=EUR,USD";

export const getExchangeRates = async (): Promise<ExchangeRates> => {
  try {
    const response = await fetch(FRANKFURTER_URL, {
      next: { revalidate: 60 * 60 * 24 * 30 },
    });

    if (!response.ok) {
      throw new Error(`Frankfurter API error: ${response.status}`);
    }

    const data = await response.json();

    return { CHF: 1, ...data.rates };
  } catch {
    return FALLBACK_RATES;
  }
};

export const toCHFWithRates = (
  amount: number,
  currency: string,
  rates: ExchangeRates,
): number => Math.round(amount / (rates[currency] ?? 1));
