import { NextResponse } from 'next/server';

import { fetchBlogs } from '@/features/blog/blog.service';

const PAGE_SIZE = 9;

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
      await fetchBlogs({
        locale: searchParams.get('locale') ?? 'fr',
        page,
        pageSize,
        filterBy: searchParams.get('filterBy') ?? '',
        search: searchParams.get('search') ?? '',
        exceptSlug: searchParams.get('exceptSlug') ?? undefined,
      })
    );
  } catch (error) {
    console.error('Error fetching blog list', error);
    return NextResponse.json(
      { message: 'Unable to load blog posts' },
      { status: 500 }
    );
  }
}
