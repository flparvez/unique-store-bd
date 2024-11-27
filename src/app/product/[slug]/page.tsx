
import ProductDetailsPage from '@/components/ProductDetailsPage'
import type { Metadata, ResolvingMetadata } from 'next';

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
    const response = await fetch('https://uniquestorebd-api.vercel.app/api/products');
    const products = await response.json();

    // Find the specific product by slug from the list of products
    const product = products?.find((prod:Prorops ) => prod.slug === slug);

    if (!product) {
     
   
      // Handle case where product is not found
      return {
        title: 'Product Not Found',
        openGraph: {
          images: ['/default-image.jpg'], // Provide a default image
        },
      };
    }



    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: product?.name,
      openGraph: {
        images: [product?.images, ...previousImages],
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