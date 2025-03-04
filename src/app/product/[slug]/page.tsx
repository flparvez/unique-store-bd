import ProductDetailsPage from '@/components/ProductDetailsPage'
import type { Metadata, ResolvingMetadata } from 'next';
import { htmlToText } from 'html-to-text';
import { IProduct } from '@/models/product.models';

type Props = {
  params: Promise<{ slug: string }>;
};
type Prorops = {
  slug: string;
  name: string
  images: string
};


async function getProduct(slug: string): Promise<IProduct | null> {
  try {
    const res = await fetch(`https://uniquestorebd-api.vercel.app/api/products/slug/${slug}`, {
      next: { revalidate: 3600 }, // ISR - Revalidate every 1 hour
    });

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const { slug } = await params;

  try {
    // Fetch data from the API that provides all products
    const product = await getProduct(slug);

    if (!product) {
     
   
      // Handle case where product is not found
      return {
        title: 'Product Not Found',

        openGraph: {
          images: ['/default-image.jpg'], // Provide a default image

        },
      };
    }
const description = htmlToText(product?.description);



    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${product.name} | Unique Store BD`,
      description: description,
      keywords: product?.seo || '',
      alternates: {
        canonical: `https://uniquestorebd.shop/product/${slug}`, // ✅ Canonical URL
      },
      openGraph: {
        type: 'website',
        title: `${product.name} | Unique Store BD`,
        description: description,
        url: `https://uniquestorebd.shop/product/${slug}`,
        images: [product.images?.[0]?.url || '/default-image.jpg', ...previousImages],
      }
    };

  } catch (error) {
    console.error('Error fetching product metadata:', error);

    // Return fallback metadata if fetching fails
    return {
      title: 'Error fetching product',

      openGraph: {
        images: ['/default-image.jpg'], // Provide a default image in case of error

      },
    };
  }
}



const ProductDetails  = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const slug = (await params).slug
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
    {/* ✅ Schema.org JSON-LD for SEO */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": image,
          "description": `Buy ${product.name} online at the best price in Bangladesh.`,
          "brand": { "@type": "Brand", "name": "Unique Store BD" },
          "offers": {
            "@type": "Offer",
            "url": `https://uniquestorebd.shop/product/${slug}`,
            "priceCurrency": "BDT",
            "price": price,
            "availability": "https://schema.org/InStock"
          }
        }),
      }}
    />

    {/* ✅ Product Details Component */}
    <ProductDetailsPage slug={slug} />
  </>

  ) ;


};

export default ProductDetails;