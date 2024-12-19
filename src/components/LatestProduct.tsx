"use client"; // Ensure this component is client-side only if needed

  import Pagination from '@/components/Pagination'  
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/services/prodcutApi";
import Loading from './Loading';

type Products = {
  _id: string;
  slug: string;
  name: string;
  sname: string;
  description: string; // Updated to string type
  category: string;
  images: { url: string; public_id: string }[];
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number; // Added new field
  warrenty: string; // Added new field
};



const LatestProduct = () => {
  const {data: products,isLoading} = useGetProductsQuery("")
// const LatestProduct = ({products}: {products: Products[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(16);

 // Calculate the current products
 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber)

  const truncateText = (text:string, maxLength:number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "";
    }
  }
 
if (isLoading) {
  return <Loading />
}

  return (
<div className="w-full sm:w-[80%] mx-auto sm:px-4 px-2 py-4">
  
<div className="grid grid-cols-2 sm:grid-cols-2  gap-4 md:grid-cols-3 lg:grid-cols-5">
{currentProducts?.map((product:Products) => (

<div key={product._id} className="bg-white rounded-lg  overflow-hidden">
  <Link href={`/product/${product.slug}`} className="block">
  <div className="overflow-hidden">
  <Image
    width={300}
    height={300}
    src={product.images[0].url}
    alt={product.name}
    className="object-cover "
    loading="lazy"
  />
</div>
      <div className="p-3">
      {/* <h3 className="text-sm text-black sm:text-lg  font-bold hidden lg:block">{product.name}</h3> */}
      <h3 className="text-sm block text-black sm:text-xl  font-bold ">{product.sname} </h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold">৳{product.price}</span>
          <span className="text-gray-900 line-through animate-pulse">৳{product.mprice}</span>
        </div>
      </div>
      </Link>
    </div>

))}

     
</div>
<Pagination
       currentPage={currentPage}
       totalPages={Math.ceil(products?.length / productsPerPage)}
       onPageChange={paginate}
     />
</div>
  )
};

export default LatestProduct;