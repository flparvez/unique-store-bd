import ProductDetailsPage from '@/components/ProductDetailsPage';
import type { Metadata, ResolvingMetadata } from 'next';
import { htmlToText } from 'html-to-text';

type Props = {
  params: { slug: string };
};

// ✅ Generate Metadata for SEO & OpenGraph
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;

  try {
    // Fetch product details
    const response = await fetch(`https://uniquestorebd-api.vercel.app/api/products/slug/${slug}`);
    const product = await response.json();

    if (!product || !product?.name) {
      return {
        title: 'Product Not Found | Unique Store BD',
        description: 'This product is not available.',
        openGraph: {
          type: 'website', // ✅ Fixed OpenGraph type
          images: ['/default-image.jpg'],
        },
      };
    }

    const description = htmlToText(product?.description || '');
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${product?.name} | Unique Store BD`,
      description: description,
      keywords: product?.seo || '',
      alternates: {
        canonical: `https://uniquestorebd.shop/product/${slug}`, // ✅ Canonical URL
      },
      openGraph: {
        type: 'website', // ✅ OpenGraph type must be "article" or "website"
        title: `${product?.name} | Unique Store BD`,
        description: description,
        url: `https://uniquestorebd.shop/product/${slug}`,
        images: [product?.images?.[0]?.url || '/default-image.jpg', ...previousImages],
      }
 
    };
  } catch (error) {
    console.error('Error fetching product metadata:', error);

    return {
      title: 'Error fetching product | Unique Store BD',
      description: 'There was an error fetching this product.',
      openGraph: {
        type: 'website', // ✅ Ensure valid OpenGraph type
        images: ['/default-image.jpg'],
      },
    };
  }
}

// ✅ Product Details Component (Server Component)
const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
    // Fetch product details
    const response = await fetch(`https://uniquestorebd-api.vercel.app/api/products/slug/${slug}`);
    const product = await response.json();
   
const price = product?.price || 0;
const image = product?.images?.[0]?.url || '/default-image.jpg'
  return (
    <>
      {/* ✅ Schema.org JSON-LD for Google Indexing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": slug,
            "image": {image}, // Update based on API data
            "description": `Buy ${slug} online at the best price in Bangladesh.`,
            "brand": { "@type": "Brand", "name": "Unique Store BD" },
            "offers": {
              "@type": "Offer",
              "url": `https://uniquestorebd.shop/product/${slug}`,
              "priceCurrency": "BDT",
              "price": {price}, // Update with actual price
              "availability": "https://schema.org/InStock"
            }
          }),
        }}
      />

      {/* ✅ Product Details Component */}
      <ProductDetailsPage slug={slug} />
    </>
  );
};

export default ProductDetails;
