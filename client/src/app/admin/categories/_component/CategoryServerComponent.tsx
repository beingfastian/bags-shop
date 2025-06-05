import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getAllCategories } from '@/services/api/CategoryService';

export default async function CategoryServerComponent() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
  });

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
