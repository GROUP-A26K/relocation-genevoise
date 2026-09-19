import { NextResponse } from 'next/server';

import { fetchProperties } from '@/features/property/property.service';

const PAGE_SIZE = 12;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Math.min(
    Number(searchParams.get('pageSize')) || PAGE_SIZE,
    100
  );

  if (page < 1 || pageSize < 1) {
    return NextResponse.json(
      { message: 'Invalid pagination' },
      { status: 400 }
    );
  }

  try {
    return NextResponse.json(
      await fetchProperties({
        locale: searchParams.get('locale') ?? 'fr',
        page,
        pageSize,
        category: (searchParams.get('category') ?? '')
          .split(',')
          .filter(Boolean),
        location: searchParams.get('location') ?? '',
        minPrice: Number(searchParams.get('minPrice')) || 0,
        maxPrice: Number(searchParams.get('maxPrice')) || 0,
        currency: searchParams.get('currency') ?? undefined,
        sort: searchParams.get('sort') ?? undefined,
        rooms: searchParams.get('rooms') ?? '',
        availableOnly: searchParams.get('availableOnly') === 'true',
      })
    );
  } catch (error) {
    console.error('Error fetching properties', error);
    return NextResponse.json(
      { message: 'Unable to load properties' },
      { status: 500 }
    );
  }
}
