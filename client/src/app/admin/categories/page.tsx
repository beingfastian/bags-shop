'use client';

import dynamic from 'next/dynamic';

// import CategoryPage from './_component/category';
const CategoryPage = dynamic(() => import('./_component/category'), {
  ssr: false,
});

export default async function Page() {
  return <CategoryPage />;
}
