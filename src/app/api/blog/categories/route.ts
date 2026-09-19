import { NextResponse } from 'next/server';

import { fetchPostCategory } from '@/features/blog/blog.service';

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'fr';

  try {
    return NextResponse.json(await fetchPostCategory({ locale }));
  } catch (error) {
    console.error('Error fetching blog categories', error);
    return NextResponse.json(
      { message: 'Unable to load blog categories' },
      { status: 500 }
    );
  }
}
