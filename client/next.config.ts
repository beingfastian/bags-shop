import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  images: {
    domains: ['via.placeholder.com', 'minio.cruxdevs.com'],
    unoptimized: true,
  },
};

export default nextConfig;
