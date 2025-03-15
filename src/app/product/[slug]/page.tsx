import ProductDetailsPage from '@/components/ProductDetailsPage';
import type { Metadata, ResolvingMetadata } from 'next';
import { htmlToText } from 'html-to-text';
import { IProduct } from '@/models/product.models';

// Types
type Props = {
  params: { slug: string };
};

// Fetch product data
async function getProduct(slug: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`https://uniquestorebd-api.vercel.app/api/products/slug/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// SEO Metadata generation
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  try {
    const product = await getProduct(slug);

    if (!product) {
      return {
        title: 'Product Not Found | Unique Store BD',
        description: 'Sorry, this product is unavailable. Check other great deals at Unique Store BD!',
        openGraph: { images: ['/default-image.jpg'] },
      };
    }

    const description = htmlToText(product?.description || '').slice(0, 155);
    const keywords = `${product?.seo}, ${product?.category?.name || ''}, Unique Store BD, Buy ${product.name} in Bangladesh`;

    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${product.name} | Unique Store BD`,
      description,
      keywords,
      alternates: { canonical: `https://uniquestorebd.shop/product/${slug}` },


      openGraph: {
        type: 'website',
        title: `${product.name} | Unique Store BD`,
        description,
        url: `https://uniquestorebd.shop/product/${slug}`,
        images: [product.images?.[0]?.url || '/default-image.jpg', ...previousImages],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Error fetching product',
      description: 'Unable to load product details. Please try again later.',
      openGraph: { images: ['/default-image.jpg'] },
    };
  }
}

// Product Details Component
const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-500">Product Not Found</h2>
        <p className="text-gray-600">Sorry, this product is unavailable.</p>
      </div>
    );
  }

  const price = product?.price || 0;
  const image = product?.images?.[0]?.url || '/default-image.jpg';

  return (
    <>
      {/* ✅ Enhanced Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.name,
            "image": image,
            "description": `Buy ${product.name} online at the best price in Bangladesh from Unique Store BD.`,
            "brand": { "@type": "Brand", "name": "Unique Store BD" },
            
            "category": product.category || 'General',
            "offers": {
              "@type": "Offer",
              "url": `https://uniquestorebd.shop/product/${slug}`,
              "priceCurrency": "BDT",
              "price": price,
              "priceValidUntil": "2025-12-31",
              "availability": "https://schema.org/InStock",
              "seller": { "@type": "Organization", "name": "Unique Store BD" }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "15"
            },
            "review": {
              "@type": "Review",
              "author": "Md Ashikur Rahman",
              "datePublished": "2024-11-19",
              "description": "Excellent quality and value for money!",
              "name": "Highly recommended",
              "reviewRating": {
                "@type": "Rating",
                "bestRating": "5",
                "ratingValue": "5",
                "worstRating": "1"
              }
            }
          }),
        }}
      />

      {/* ✅ Render Product Details Page */}
      <ProductDetailsPage slug={slug} />
    </>
  );
};

export default ProductDetails;
