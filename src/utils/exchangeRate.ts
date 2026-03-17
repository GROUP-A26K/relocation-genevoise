const COOKIE_KEY = "x_exchange_rates";
const CACHE_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface ExchangeRates {
  CHF: number;
  EUR: number;
  USD: number;
  [key: string]: number;
}

interface CachedRates {
  rates: ExchangeRates;
  fetchedAt: number;
}

export const FALLBACK_RATES: ExchangeRates = {
  CHF: 1,
  EUR: 1.107,
  USD: 1.123,
};

export const getCachedRates = (): ExchangeRates | null => {
  if (typeof document === "undefined") return null;

  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_KEY}=`));

    if (!match) return null;

    const raw = decodeURIComponent(match.slice(COOKIE_KEY.length + 1));
    const cached: CachedRates = JSON.parse(raw);

    if (Date.now() - cached.fetchedAt > CACHE_DURATION_MS) return null;

    return cached.rates;
  } catch {
    return null;
  }
};

export const setCachedRates = (rates: ExchangeRates): void => {
  if (typeof document === "undefined") return;

  try {
    const payload: CachedRates = { rates, fetchedAt: Date.now() };
    const expires = new Date(Date.now() + CACHE_DURATION_MS).toUTCString();
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(JSON.stringify(payload))}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // Silently fail if cookie is too large
  }
};
