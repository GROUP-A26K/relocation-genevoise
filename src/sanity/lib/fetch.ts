import "server-only";

import { client } from "./client";

interface SanityFetchOptions {
  tags?: string[];
}

const REVALIDATE_FALLBACK_SECONDS = 300;

export const sanityFetch = async <T>(
  query: string,
  params: Record<string, unknown> = {},
  options: SanityFetchOptions = {},
): Promise<T> => {
  if (!client.config().token) {
    throw new Error(
      "Sanity read token is missing. Against a private dataset this would " +
        "silently return empty results instead of failing — check that " +
        "SANITY_API_READ_TOKEN is set in the deployment environment.",
    );
  }

  if (!options.tags) {
    return client.fetch<T>(query, params);
  }

  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_FALLBACK_SECONDS, tags: options.tags },
  });
};
