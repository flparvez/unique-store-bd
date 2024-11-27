"use client";

import React, { useState } from 'react';
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

// Define the component props type
interface ProductByCategoryProps {
  slug: string;
}

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ slug }) => {
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
      <div className="overflow-hidden">
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
          <h3 className="text-sm text-black sm:text-xl  font-bold">{product.name}</h3>
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
