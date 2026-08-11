import { NextResponse } from "next/server";

import { getExchangeRates } from "@/utils/exchangeRate.server";

export async function GET() {
  const rates = await getExchangeRates();

  return NextResponse.json(
    { base: "CHF", rates },
    {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    },
  );
}
