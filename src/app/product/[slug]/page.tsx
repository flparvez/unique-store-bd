
import ProductDetailsPage from '@/components/ProductDetailsPage'
import type { Metadata, ResolvingMetadata } from 'next';
import { htmlToText } from 'html-to-text';
type Props = {
  params: Promise<{ slug: string }>;
};
type Prorops = {
  slug: string;
  name: string
  images: string
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const { slug } = await params;

  try {
    // Fetch data from the API that provides all products
    const response = await fetch(`https://uniquestorebd-api.vercel.app/api/products/slug/${slug}`);
    const product = await response.json();


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
      title: product?.name,
      keywords: product?.seo,
    // description: product?.name,
    description: description,
      openGraph: {
        title: product?.name,
        images: [product?.images[0].url, ...previousImages],
        description: description,
        url: `https://uniquestorebd.shop/product/${slug}`,
       
      },
      
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

  return <ProductDetailsPage slug={slug}  /> ;
};

export default ProductDetails;