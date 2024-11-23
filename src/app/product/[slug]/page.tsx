import ProductDetailsPage from '@/components/ProductDetailsPage'

// import Loading from '@/components/Loading';
// import type { Metadata, ResolvingMetadata } from 'next';

// type Props = {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
  
// const product = await fetch(`https://uniquestorebd.vercel.app/api/product/${params.slug}`).then((res) => res.json())


// if(!product) <Loading />
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product?.product.name,
//     openGraph: {
//       images: [product?.product.images, ...previousImages],
//     },
//   };
// }

const ProductDetails  = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const slug = (await params).slug

  return <ProductDetailsPage slug={slug}  /> ;
};

export default ProductDetails;