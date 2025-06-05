// //providers/ReactQueryProvider.tsx
// 'use client';

// import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query';
// import { ReactNode, useState } from 'react';

// export function ReactQueryProvider({ children, dehydratedState }: { children: ReactNode; dehydratedState?: any }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Hydrate state={dehydratedState}>{children}</Hydrate>
//     </QueryClientProvider>
//   );
// }
