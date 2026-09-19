import { NextResponse } from 'next/server';

import { fetchFeaturedJobPosts } from '@/features/career/career.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'fr';

  if (!slug)
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });

  try {
    return NextResponse.json(
      await fetchFeaturedJobPosts(slug, {
        locale,
        filterBy: searchParams.get('filterBy') ?? '',
      })
    );
  } catch (error) {
    console.error('Error fetching featured career posts', error);
    return NextResponse.json(
      { message: 'Unable to load featured jobs' },
      { status: 500 }
    );
  }
}
