import { NextResponse } from 'next/server';

import { fetchJobPosts } from '@/features/career/career.service';
import {
  boundedText,
  createListQuerySchema,
  readQuery,
} from '@/utils/listQuery';

const PAGE_SIZE = 5;

const careerListQuerySchema = createListQuerySchema(PAGE_SIZE).extend({
  filterBy: boundedText(),
  search: boundedText(),
});

export async function GET(request: Request) {
  const query = careerListQuerySchema.safeParse(readQuery(request));

  if (!query.success) {
    return NextResponse.json({ message: 'Invalid query' }, { status: 400 });
  }

  try {
    return NextResponse.json(await fetchJobPosts(query.data));
  } catch (error) {
    console.error('Error fetching career list', error);
    return NextResponse.json(
      { message: 'Unable to load career posts' },
      { status: 500 }
    );
  }
}
