import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'i.ibb.co.com',
      'i.ibb.co',
      'assets.aceternity.com',
      'dropshop.com.bd',
      'm.media-amazon.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=10, stale-while-revalidate=59',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
