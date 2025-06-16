import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
export async function POST() {
  const tags = ['blogs', 'blog', 'sitemap-blogs', 'categories'];

  await Promise.all(tags.map((t) => revalidateTag(t)));

  return NextResponse.json({ revalidated: tags });
}
