'use client';
import React from 'react';
import MainLayout from '../components/MainLayout';
import Header from './_components/Header';

interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
    <MainLayout>
      <main className="w-4/5 mx-auto">
        <Header />
        {children}
      </main>
    </MainLayout>
  );
}

export default Layout;
