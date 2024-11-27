import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://uniquestorebd-api.vercel.app/";
  const Url = "https://uniquestorebd.vercel.app/";

  try {
    const response = await fetch(`${baseUrl}api/products`);

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Expected JSON response, but got:', contentType);
      return [
        {
          url: Url,
          lastModified: new Date().toISOString(),
        }
      ];
    }

    const data = await response.json();
    const products = data;

    const allProducts = products?.map((product: { slug: string; createdAt: string }) => ({
      url: `${Url}product/${product.slug}`,
      lastModified: new Date(product.createdAt).toISOString(),
    }));

    return [
      {
        url: Url,
        lastModified: new Date().toISOString(),
      },
      ...allProducts,
    ];
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [
      {
        url: Url,
        lastModified: new Date().toISOString(),
      }
    ];
  }
}
