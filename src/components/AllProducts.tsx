"use client"; // Ensure this component is client-side only if needed

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/services/prodcutApi";
import Loading from "./Loading";

type Products = {
  _id: string;
  slug: string;
  name: string;
  sname: string;
  description: string; // Updated to string type
  category: string;
  images: {
    url: string;
  }[];
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number; // Added new field
  warrenty: string; // Added new field
};



const AllProducts = () => {
  const {data: products,isLoading} = useGetProductsQuery("")
// const LatestProduct = ({products}: {products: Products[] }) => {
  const truncateText = (text:string, maxLength:number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "";
    }
  }
if (isLoading) {
  return <Loading />
}

  return (
<div className="container mx-auto sm:px-4 px-2 py-8">
  
<div className="grid grid-cols-2 sm:grid-cols-3  gap-4 md:grid-cols-3 lg:grid-cols-4">
{products?.map((product:Products) => (

<div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
  <Link href={`/product/${product.slug}`} className="block">
   <div className="relative">
   <Image
     width={300}
     height={300}
     src={product.images[0].url}
     alt={product.name}
     className="object-cover sm:h-[230px]  h-[180px] hover:animate-pulse"
     loading="lazy"
   />
 
 
   <div className="absolute bottom-0 left-0 flex justify-center w-full py-1 rounded-b">
     <h3 className="text-sm font-semibold bg-black w-16 sm:w-28  text-white text-center">
 
 
 
     {product.stock > 0? "In Stock" : "Out of Stock"}
     </h3>
   </div>
 
 </div>
      <div className="p-3">
      <h3 className="text-sm block text-black sm:text-xl  font-bold ">{product.sname} </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold">৳{product.price}</span>
          <span className="text-gray-500 line-through">৳{product.mprice }</span>
        </div>
      </div>
      </Link>
    </div>

))}

     
</div>

</div>
  )
};

export default AllProducts;