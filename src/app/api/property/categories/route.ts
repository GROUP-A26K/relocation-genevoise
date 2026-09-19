import { NextResponse } from 'next/server';

import { fetchPropertyCategories } from '@/features/property/property.service';

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'fr';

  try {
    return NextResponse.json({
      categories: await fetchPropertyCategories({ locale }),
    });
  } catch (error) {
    console.error('Error fetching property categories', error);
    return NextResponse.json(
      { message: 'Unable to load property categories' },
      { status: 500 }
    );
  }
}
