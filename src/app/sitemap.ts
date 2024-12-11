import { Product } from '@/models/product.models';
import { connectDb } from '@/lib/DbConnect';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://uniquestorebd.vercel.app/';

  try {
    await connectDb(); // Ensure the database is connected
    const products = await Product.find().lean(); // Fetch products from the database

    const allProducts = products.map((product) => ({
      url: `${baseUrl}product/${product.slug}`,
      lastModified: new Date(product.updatedAt).toISOString(), // Use updatedAt for dynamic updates
    }));

    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
      ...allProducts,
    ];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
      },
    ];
  }
}
