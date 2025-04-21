import ProductDetailsPage from "@/components/ProductDetailsPage";
import type { Metadata, ResolvingMetadata } from "next";
import { htmlToText } from "html-to-text";
import { IProduct } from "@/models/product.models";

// Simplified props type

type Props = {
  params: Promise<{ slug: string }>;
  
};
// Enhanced fetch with error handling
async function getProduct(slug: string): Promise<IProduct | null>  {
  try {
    const res = await fetch(
      `https://uniquestorebd-api.vercel.app/api/products/slug/${slug}`,
      { 
        next: { 
          revalidate: 3600,
          tags: [`product-${slug}`] 
        } 
      }
    );
    
    if (!res.ok) {
      console.error(`Failed to fetch product ${slug}: ${res.status}`);
      return null;
    }
    
    return await res.json();
  } catch (error) {
    console.error(`Network error fetching product ${slug}:`, error);
    return null;
  }
}

// Enhanced metadata generation
export async function generateMetadata({ params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: "Product Not Found | Unique Store BD",
      description: "The product you're looking for isn't available. Browse our other products.",
      robots: {
        index: false,
        follow: true,
      }
    };
  }

  // Clean description and create SEO-friendly text
  const plainDescription = htmlToText(product.description).replace(/\s+/g, ' ').trim();
  const shortDescription = plainDescription.slice(0, 155) + (plainDescription.length > 155 ? '...' : '');
  const priceText = product.price ? ` at just ৳${product.price}` : '';
  
  // Generate keywords from existing data
  const keywords = [
    product.name,
    product.sname,
    ...(product.seo?.split(',') || []),
    'buy online',
    'price in Bangladesh',
    product.category?.name || '',
    'Unique Store BD'
  ].filter(Boolean).join(', ');

  return {
    title: product?.sname,
    description: `Buy ${product.name}${priceText}. ${shortDescription} Free delivery available.`,
    keywords,
    alternates: {
      canonical: `https://uniquestorebd.shop/product/${slug}`,
    },
    openGraph: {
      title: `${product.name} Price in Bangladesh ${priceText} `,
      description: `Get ${product?.name}${priceText} in Bangladesh. ${shortDescription}`,
      url: `https://uniquestorebd.shop/product/${slug}`,
      type: 'website',
      images: product.images?.map(img => ({
        url: img.url,
        alt: `${product.name} product image`,
      })) || [{ url: '/default-image.jpg' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | Unique Store BD`,
      description: `Available now${priceText}. ${shortDescription}`,
      images: product.images?.[0]?.url || '/default-image.jpg',
    },
  };
}

// Enhanced Product Details Component
const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className=" mx-auto py-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Product Not Available</h1>
        <p className="text-gray-600 mb-4">
          The product you're looking for is currently unavailable.
        </p>
        <a 
          href="/products" 
          className="text-blue-600 hover:underline"
          aria-label="Browse all products"
        >
          Browse our products
        </a>
      </div>
    );
  }

  // Enhanced product schema data
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    productID: product._id,
    name: product.name,
    sku: product.sname,
    description: htmlToText(product.description).slice(0, 250),
    image: product.images?.map(img => img.url) || [],
    brand: {
      "@type": "Brand",
      name: "Unique Store BD"
    },
    offers: {
      "@type": "Offer",
      url: `https://uniquestorebd.shop/product/${slug}`,
      priceCurrency: "BDT",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      availability: product.stock > 0 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: product.advanced === 200 ? 0 : 100,
          currency: "BDT"
        }
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "15",
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <>
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Breadcrumb navigation for SEO */}
      <nav aria-label="Breadcrumb" className="container mt-10 mx-auto px-2 pt-2 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <a href="/" className="text-blue-600 hover:underline">Home</a>
          </li>
          <li>/</li>
          <li>
            <a 
              href={`/products/${product.category?.slug || ''}`} 
              className="text-blue-600 hover:underline"
            >
              {product?.category?.name || 'Products'}
            </a>
          </li>
          <li>/</li>
          <li className="text-gray-600" aria-current="page">
            {product?.sname}
          </li>
        </ol>
      </nav>

      {/* Main product content */}
      <main className="mx-auto px-2">
  
        
     

     

        {/* Render the product details component */}
        <ProductDetailsPage slug={slug} />

        {/* FAQ section for SEO */}
        <section className="my-8">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold"> What is the price of <b>{product?.sname}</b> in Bangladesh?</h3>
              <p>
              The latest price of <b>{product?.sname}</b> is{' '}
                <b>৳{product?.price}</b> in Bangladesh. You can purchase the{' '}
                {product?.sname} in Bangladesh at the best price from our website or any
                of our stores.
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Where can I buy {product.name} in Bangladesh?</h3>
              <p>
                You can purchase {product.name} from Unique Store BD with nationwide delivery across Bangladesh. 
                We offer secure online payment options and cash on delivery.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductDetails;