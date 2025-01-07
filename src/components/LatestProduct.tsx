"use client";

import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/services/prodcutApi";
import Loading from "./Loading";

type Products = {
  _id: string;
  slug: string;
  name: string;
  sname: string;
  description: string;
  category: string;
  images: { url: string; public_id: string }[];
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number;
  warrenty: string;
};

const LatestProduct = () => {
  const { data: products, isLoading } = useGetProductsQuery("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  const truncateText = (text:any, maxLength:any) =>
    text.length > maxLength ? text.substring(0, maxLength) : text;

  // Calculate current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full sm:w-[80%] mx-auto sm:px-4 px-2 py-2">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {currentProducts?.map((product: Products) => (
          <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
            <Link href={`/product/${product.slug}`} className="block">
              <div className="relative">
                {/* Product Image */}
                <Image
                  width={300}
                  height={300}
                  src={product.images[0].url}
                  alt={product.name}
                  className="object-cover sm:h-[230px] h-[180px] w-full"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/placeholder-image.jpg" // Replace with an actual placeholder image
                />
                {/* Stock Badge */}
                <div className="absolute bottom-0 left-0 flex justify-center w-full">
                  <span className="text-sm font-semibold bg-black text-white text-center px-2 py-1 rounded-tl-md rounded-tr-md">
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
              <div className="p-3">
                {/* Product Name */}
                <h3 className="text-sm sm:text-xl font-bold text-black "> {product.name.length > 35 ? truncateText(product.name, 35) : product.sname}</h3>
                {/* Price Details */}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-indigo-600 font-bold">৳{product.price}</span>
                  {product.mprice > product.price && (
                    <span className="text-gray-400 line-through">৳{product.mprice}</span>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((products?.length || 0) / productsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default LatestProduct;
