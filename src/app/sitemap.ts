export default async function sitemap() {
  const response = await fetch(`https://uniquestorebd-api.vercel.app/api/products`).then((res) => res.json());
  const products = response;
  const baseUrl = "https://uniquestorebd.vercel.app/";

  // Array of static URLs
  const staticUrls = [
    { url: `${baseUrl}`, lastModified: new Date() },
    { url: `${baseUrl}policy/returns`, lastModified: new Date() },
    { url: `${baseUrl}policy/replacement-warranty`, lastModified: new Date() },
    { url: `${baseUrl}products/Table-Lamp`, lastModified: new Date() },
    { url: `${baseUrl}products/TWS`, lastModified: new Date() },
    { url: `${baseUrl}products/Smart-Watch`, lastModified: new Date() },

  ];

  // Map product data to URLs
  const allProducts = products?.map((product:any) => {
    return {
      url: `${baseUrl}product/${product?.slug}`,
      lastModified: product?.updatedAt,
    };
  });

  // Combine static URLs and product URLs
  return [
    ...staticUrls,
    ...allProducts
  ];
}
