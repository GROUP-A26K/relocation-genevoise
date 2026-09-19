import 'server-only';

import { client } from './client';

import type { ClientReturn, QueryParams } from '@sanity/client';

type TSanityFetchOptions = {
  tags?: string[];
  cache?: 'no-store';
};

export type TSanityTypesOutOfDate = {
  readonly __error: 'Query missing from src/sanity/types.ts — run `npm run typegen`';
};

const REVALIDATE_TAGGED_SECONDS = 86400;

const REVALIDATE_FALLBACK_SECONDS = 300;

export const sanityFetch = async <const Q extends string>(
  query: Q,
  params: QueryParams = {},
  options: TSanityFetchOptions = {}
): Promise<ClientReturn<Q, TSanityTypesOutOfDate>> => {
  if (!client.config().token) {
    throw new Error(
      'Sanity read token is missing. Against a private dataset this would ' +
        'silently return empty results instead of failing — check that ' +
        'SANITY_API_READ_TOKEN is set in the deployment environment.'
    );
  }

  if (options.cache === 'no-store') {
    return client.fetch(query, params, { cache: 'no-store' });
  }

  return client.fetch(query, params, {
    next: {
      revalidate: options.tags?.length
        ? REVALIDATE_TAGGED_SECONDS
        : REVALIDATE_FALLBACK_SECONDS,
      tags: options.tags,
    },
  });
};
