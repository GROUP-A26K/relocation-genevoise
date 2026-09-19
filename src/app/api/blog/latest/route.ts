import { NextResponse } from 'next/server';

import { fetchLatestBlog } from '@/features/blog/blog.service';

export async function GET(request: Request) {
  const locale = new URL(request.url).searchParams.get('locale') ?? 'fr';

  try {
    const blog = await fetchLatestBlog(locale);
    return blog
      ? NextResponse.json(blog)
      : NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.error('Error fetching latest blog', error);
    return NextResponse.json(
      { message: 'Unable to load latest blog' },
      { status: 500 }
    );
  }
}
