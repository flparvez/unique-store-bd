import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://uniquestorebd.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },  
      {
      url: 'https://uniquestorebd.vercel.app/products/sitemap.xml',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    {
      url: 'https://uniquestorebd.vercel.app/policy/returns',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://uniquestorebd.vercel.app/policy/replacement-warranty',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: 'https://uniquestorebd.vercel.app/policy/after-sales-support',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
    {
      url: 'https://uniquestorebd.vercel.app/products/tws',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.3,
    },


  ]
}