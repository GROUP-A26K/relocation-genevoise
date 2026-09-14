import { NextResponse } from 'next/server';

import { getPropertyDetail } from '@/features/property/property.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'fr';

  if (!slug)
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });

  try {
    const property = await getPropertyDetail(slug, locale);
    return property
      ? NextResponse.json(property)
      : NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.error('Error fetching property detail', error);
    return NextResponse.json(
      { message: 'Unable to load property' },
      { status: 500 }
    );
  }
}
