import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.ibb.co.com','i.ibb.co','assets.aceternity.com','dropshop.com.bd','m.media-amazon.com'],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://uniquestorebd-api.vercel.app/api/:path*' // Proxy to Backend
  //     }
  //   ];
  // }
};

export default nextConfig;
