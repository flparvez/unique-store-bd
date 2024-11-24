"use client"
import { useGetProductsQuery } from '../store/services/prodcutApi';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const LatestProductList = () => {
  const {data} = useGetProductsQuery()
  const latestProducts = data?.slice(0, 10);
  
  return (
    <div>
      <h2 className='text-2xl font-bold text-center mt-4'>Latest Products</h2>
      <div className="container mx-auto sm:px-4 px-2 py-8">
<div className="grid grid-cols-2 sm:grid-cols-2  gap-4 md:grid-cols-2 lg:grid-cols-3">
{latestProducts?.map((product) => (

<div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
  <Link href={`/product/${product.slug}`} className="block">
      <Image width={300} height={300} src={product.images} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-3">
        <h3 className="text-sm font-medium sm:text-xl  sm:font-semibold">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold">৳{product.price}</span>
          <span className="text-gray-500 line-through">৳{product.price +220}</span>
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