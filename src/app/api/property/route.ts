import { z } from 'zod';
import { NextResponse } from 'next/server';

import { fetchProperties } from '@/features/property/property.service';
import {
  boundedText,
  createListQuerySchema,
  readQuery,
} from '@/utils/listQuery';

const PAGE_SIZE = 12;
const MAX_CATEGORIES = 10;
const MAX_PRICE = 1_000_000_000;
const MAX_OPTION_LENGTH = 20;

const price = z.coerce
  .number()
  .min(0)
  .catch(0)
  .transform((value) => Math.min(value, MAX_PRICE));

const propertyListQuerySchema = createListQuerySchema(PAGE_SIZE).extend({
  category: boundedText(1000)
    .transform((value) => value.split(',').filter(Boolean))
    .pipe(z.array(z.string().max(100)).max(MAX_CATEGORIES)),
  location: boundedText(),
  minPrice: price,
  maxPrice: price,
  currency: boundedText(MAX_OPTION_LENGTH),
  sort: boundedText(MAX_OPTION_LENGTH),
  rooms: boundedText(MAX_OPTION_LENGTH),
  availableOnly: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
});

export async function GET(request: Request) {
  const query = propertyListQuerySchema.safeParse(readQuery(request));

  if (!query.success) {
    return NextResponse.json({ message: 'Invalid query' }, { status: 400 });
  }

  const { currency, sort, ...filters } = query.data;

  try {
    return NextResponse.json(
      await fetchProperties({
        ...filters,
        currency: currency || undefined,
        sort: sort || undefined,
      })
    );
  } catch (error) {
    console.error('Error fetching properties', error);
    return NextResponse.json(
      { message: 'Unable to load properties' },
      { status: 500 }
    );
  }
}
