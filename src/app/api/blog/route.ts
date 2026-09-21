import { NextResponse } from 'next/server';

import { fetchBlogs } from '@/features/blog/blog.service';
import {
  boundedText,
  createListQuerySchema,
  readQuery,
} from '@/utils/listQuery';

const PAGE_SIZE = 9;
const MAX_SLUG_LENGTH = 200;

const blogListQuerySchema = createListQuerySchema(PAGE_SIZE).extend({
  filterBy: boundedText(),
  search: boundedText(),
  exceptSlug: boundedText(MAX_SLUG_LENGTH),
});

export async function GET(request: Request) {
  const query = blogListQuerySchema.safeParse(readQuery(request));

  if (!query.success) {
    return NextResponse.json({ message: 'Invalid query' }, { status: 400 });
  }

  const { exceptSlug, ...filters } = query.data;

  try {
    return NextResponse.json(
      await fetchBlogs({ ...filters, exceptSlug: exceptSlug || undefined })
    );
  } catch (error) {
    console.error('Error fetching blog list', error);
    return NextResponse.json(
      { message: 'Unable to load blog posts' },
      { status: 500 }
    );
  }
}
