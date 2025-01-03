"use client";

import React, { useEffect, useState } from 'react';
import { useGetProductsQuery } from "@/store/services/prodcutApi";

import Image from 'next/image';
import Link from 'next/link';
import Pagination from './Pagination';
import Loading from './Loading';

// Define the Product type
interface Product {
  _id: string;
  name: string;
  category: {
    slug: string;
  };
}

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

// Define the component props type
interface ProductByCategoryProps {
  slug: string;
}

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ slug }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data,isLoading } = useGetProductsQuery("");

  // Filter products by category slug
  const filterProducts = data?.filter((product: Product) => product?.category?.slug === slug);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

 // Calculate the current products
 const indexOfLastProduct = currentPage * productsPerPage;
 const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
 const currentProducts = filterProducts?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber:number) => setCurrentPage(pageNumber)
 
  if (isLoading) {
    return <Loading />
  }
  

  return (
    <div className="container mx-auto sm:px-4 px-2 py-8">
    <div className="grid grid-cols-2 sm:grid-cols-3  gap-4 md:grid-cols-3 lg:grid-cols-4">
    {currentProducts?.map((product:Products) => (
    
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
          <h3 className="text-sm text-black sm:text-xl  font-bold">{product.sname}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-indigo-600 font-bold">৳{product.price}</span>
              <span className="text-gray-500 line-through">৳{product.mprice}</span>
            </div>
          </div>
          </Link>
        </div>
    
    ))}
    
         
    </div>
    <Pagination
           currentPage={currentPage}
           totalPages={Math.ceil(filterProducts?.length / productsPerPage)}
           onPageChange={paginate}
         />
         
    </div>
  );
}

export default ProductByCategory;
