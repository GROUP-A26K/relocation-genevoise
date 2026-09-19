'use client';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  environmentManager,
  QueryClientProvider,
  type QueryClient,
} from '@tanstack/react-query';

import { makeQueryClient } from '@/libs/queryClient';

let browserQueryClient: QueryClient | undefined;

const getQueryClient = () => {
  if (environmentManager.isServer()) return makeQueryClient();

  browserQueryClient ??= makeQueryClient();
  return browserQueryClient;
};

export default function TanstackQueryProvider({
  children,
}: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={getQueryClient()}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
