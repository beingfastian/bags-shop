'use client';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

const QueryProvider = ({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState?: any;
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {dehydratedState ? (
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      ) : (
        children
      )}
    </QueryClientProvider>
  );
};

export default QueryProvider;
