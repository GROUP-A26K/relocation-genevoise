import { NextResponse } from "next/server";

// Frankfurter.app: free, no API key, uses European Central Bank data
const FRANKFURTER_URL = "https://api.frankfurter.app/latest?base=CHF&symbols=EUR,USD";

export async function GET() {
  try {
    const response = await fetch(FRANKFURTER_URL, {
      // Server-side cache: revalidate every 30 days
      next: { revalidate: 60 * 60 * 24 * 30 },
    });

    if (!response.ok) {
      throw new Error(`Frankfurter API error: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(
      {
        base: "CHF",
        rates: { CHF: 1, ...data.rates },
        date: data.date,
      },
      {
        headers: {
          // Browser cache: 1 hour (client re-validates via cookie anyway)
          "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch {
    // Return fallback rates so the app never breaks
    return NextResponse.json(
      { base: "CHF", rates: { CHF: 1, EUR: 1.107, USD: 1.123 }, date: null },
      { status: 200 },
    );
  }
}
