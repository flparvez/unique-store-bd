"use client"
import { useGetProductsQuery } from '../store/services/prodcutApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LatestProductList = () => {
  const {data} = useGetProductsQuery()
  const latestProducts = data?.slice(0, 10);
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "";
    }
  }
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mt-4'>Latest Products</h2>
      <div className="container mx-auto sm:px-4 px-2 py-8">
<div className="grid grid-cols-2 sm:grid-cols-2  gap-4 md:grid-cols-2 lg:grid-cols-3">
{latestProducts?.map((product) => (

<div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
  <Link href={`/product/${product.slug}`} className="block">
  <div className="overflow-hidden">
  <Image
    width={300}
    height={300}
    src={product.images[0].url}
    alt={product.name}
    className="object-cover w-[42vh] h-[27vh] "
    loading="lazy"
  />
</div>
      <div className="p-3">
      <h3 className="text-sm block text-black sm:text-xl  font-bold ">{product.name.length > 50 ?  truncateText(product?.name, 50)+"..." : product.name} </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold animate-pulse">৳{product.price}</span>
          <span className="text-gray-500 line-through">৳{product.mprice}</span>
        </div>
      </div>
      </Link>
    </div>

))}

     
</div>

</div>
    </div>
  )
}

export default LatestProductList