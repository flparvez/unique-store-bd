import React from 'react'

import ProductByCategory from '@/components/ProductByCategory';
import CategorySlider from '@/components/CategorySlider';
import type { Metadata, ResolvingMetadata } from 'next';
import Loading from '@/components/Loading';
import Link from 'next/link';
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
    title:category?.name,
    description: category?.name + " Best Price In Unique Store BD" + ", " + category?.tags,
    keywords: category?.tags ,
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



  const category = await fetch(`https://uniquestorebd-api.vercel.app/api/categories/${slug}`).then((res) => res.json())

  return (
    <div>
 <h1 className="text-2xl font-bold mt-16 sm:mt-24 justify-center flex">  {category?.name} - Unique Store Bd </h1>
 <CategorySlider />
    <ProductByCategory slug={slug} />
<br />
<div className="  justify-center flex flex-wrap gap-2 mb-2 mt-2">
{
  category?.tags?<div><span>Tags </span><li
  className="px-3 py-1 w-[100%] space-x-2 bg-blue-200 text-blue-800 rounded-md break-words"
 > {category?.tags}</li></div>  : null
}

</div>

    <div className="max-w-7xl mx-auto p-2">
    
    <p className="mb-4">
      <span className="font-semibold text-yellow-500">Unique Store BD</span> - The Most Reliable eCommerce Site in Bangladesh. We maintain a comprehensive stock to ensure you receive your orders as quickly as possible. Experience online shopping in Bangladesh for authentic products, including the latest tech gadgets such as live streaming gear, YouTube studio setups, vlogging gear, home studio equipment, webcams, microphones, lighting setups, ring lights, smartphones, gimbals, and related products.
    </p>
    <p className="mb-4">
      Enjoy the convenience of home delivery or courier service, or pick up your orders from our pickup point. We guarantee product quality, fast delivery, and exceptional after-sales support. Benefit from our free pre-sales and post-sales consultations to find the best budget-friendly gear.
    </p>
    <p className="mb-4">
      Our technical team is dedicated to providing a seamless online shopping experience in Bangladesh, offering world-class, original products at reasonable prices. Our customer care team is always ready to assist you with your purchases and provide technical support.
    </p>
    <p className="mb-4">
      With over one year of experience, we have earned the trust of millions of customers through authentic products and quality after-sales support, making us the most reliable and trusted platform in the Bangladesh eCommerce industry.
    </p>
    <p className="mb-4">
      Join our vibrant online community to share your shopping experiences, learn about new products, and get answers to your questions. We are highly active on social media, especially in our Facebook Page:<Link href="https://www.facebook.com/uniquestorebd23" passHref><span className="font-semibold text-yellow-500">Unique Store BD</span></Link>, where we engage with customers to improve our services.
    </p>
    <p className="mb-4">
      Whether you need live streaming equipment, YouTube studio gear, or other home studio equipment, <span className="font-semibold text-yellow-500">Unique Store BD</span> is your go-to recommendation. Help your friends by recommending us, and we'll provide friendly and professional assistance.
    </p>
  </div>
    </div>

  )
}

export default EditCategory
