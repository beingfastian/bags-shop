'use client';
import axiosInstance from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';
import { ReactNode } from 'react';

const VisitorProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useQuery({
    queryFn: async () => (await axiosInstance.get('/visitor/create'))?.data,
    queryKey: ['VisitorProvider'],
  });

  console.log(data, 'visitor');

  return children;
};

export default VisitorProvider;
