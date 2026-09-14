import { NextResponse } from 'next/server';

import { fetchBlogBySlug } from '@/features/blog/blog.service';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale') ?? 'fr';

  if (!slug)
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 });

  try {
    const blog = await fetchBlogBySlug(slug, locale);
    return blog
      ? NextResponse.json(blog)
      : NextResponse.json(null, { status: 404 });
  } catch (error) {
    console.error('Error fetching blog detail', error);
    return NextResponse.json(
      { message: 'Unable to load blog post' },
      { status: 500 }
    );
  }
}
