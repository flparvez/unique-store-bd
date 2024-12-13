import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://uniquestorebd.vercel.app/";
  return {
    rules: {
      userAgent: '*',
      allow: ["/"],
      disallow: ["/admin/*"],
    },
    sitemap: 'https://uniquestorebd.vercel.app/sitemap.xml',
  };
}
