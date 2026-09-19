import { NextResponse } from 'next/server';

import { getPropertyPhotoTour } from '@/features/property/property.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'fr';

  if (!slug)
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });

  try {
    return NextResponse.json({
      areas: await getPropertyPhotoTour(slug, locale),
    });
  } catch (error) {
    console.error('Error fetching property photo tour', error);
    return NextResponse.json(
      { message: 'Unable to load photo tour' },
      { status: 500 }
    );
  }
}
