import { NextResponse } from 'next/server';

import { fetchJobDetailBySlug } from '@/features/career/career.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'fr';

  if (!slug)
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });

  try {
    const job = await fetchJobDetailBySlug(slug, locale);
    return job
      ? NextResponse.json(job)
      : NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.error('Error fetching career detail', error);
    return NextResponse.json(
      { message: 'Unable to load career post' },
      { status: 500 }
    );
  }
}
