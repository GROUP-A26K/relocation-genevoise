import { NextResponse } from 'next/server';

import { fetchJobPosts } from '@/features/career/career.service';

const PAGE_SIZE = 5;

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
      await fetchJobPosts({
        locale: searchParams.get('locale') ?? 'fr',
        page,
        pageSize,
        filterBy: searchParams.get('filterBy') ?? '',
        search: searchParams.get('search') ?? '',
      })
    );
  } catch (error) {
    console.error('Error fetching career list', error);
    return NextResponse.json(
      { message: 'Unable to load career posts' },
      { status: 500 }
    );
  }
}
