import { QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/libs/apiClient';

export const QUERY_STALE_TIME = 60_000;

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: QUERY_STALE_TIME,
        refetchOnWindowFocus: false,
        retry: (failureCount, error) => {
          if (failureCount >= 1) return false;

          const status = error instanceof ApiError ? error.status : undefined;
          return status === undefined || status >= 500;
        },
      },
    },
  });
}
