import React from 'react'

import ProductByCategory from '@/components/ProductByCategory';
import CategorySlider from '@/components/CategorySlider';
import type { Metadata, ResolvingMetadata } from 'next';
import Loading from '@/components/Loading';
type Props = {
  params: Promise<{ slug: string }>;
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {


  const slug = (await params).slug


  const category = await fetch(`https://uniquestorebd-api.vercel.app/api/categories/${slug}`).then((res) => res.json())


if(!category) <Loading />
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: category?.name + " | Unique Store Bd",
    openGraph: {
      images: [category?.images[0].url, ...previousImages],
      tags: [category?.name, ...previousImages],
      url: `https://uniquestorebd.vercel.app/products/${category?.slug}`,
    },
  };
}
const EditCategory =async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const slug = (await params).slug
  const categoryName = slug.replace(/-/g, ' ').toUpperCase();

  return (
    <div>
 <h1 className="text-2xl font-bold"> Category: {categoryName} </h1>
 <CategorySlider />
    <ProductByCategory slug={slug} />
  
    </div>

  )
}

export default EditCategory
