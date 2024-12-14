"use client"; // Ensure this component is client-side only if needed

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/services/prodcutApi";

type Products = {
  _id: string;
  slug: string;
  name: string;
  description: string; // Updated to string type
  category: string;
  images: string;
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number; // Added new field
  warrenty: string; // Added new field
};



const TopSellingProduct = () => {
  const {data} = useGetProductsQuery("")

  // filter by tags top selling
  const products = data?.filter((product:Products) => product.tags === "best-sell")

  return (
<div className="container mx-auto sm:px-4 px-2 py-8 ">
  
<div className="grid grid-cols-2 sm:grid-cols-3  gap-4 md:grid-cols-3 lg:grid-cols-4">
{products?.map((product:Products) => (

<div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden ">
  <Link href={`/product/${product.slug}`} className="block">
  <div className="overflow-hidden ">
  <Image
    width={300}
    height={300}
    src={product.images}
    alt={product.name}
    className="object-cover w-full h-full"
    loading="lazy"
  />
</div>
      <div className="p-3">
      <h3 className=" text-black  sm:text-xl  font-extrabold">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-red-600 text-xl font-bold animate-pulse">৳{product.price}</span>
          <span className="text-gray-500 line-through">৳{product.mprice}</span>
        </div>
      </div>
      </Link>
    </div>

))}

     
</div>

</div>
  )
};

export default TopSellingProduct;