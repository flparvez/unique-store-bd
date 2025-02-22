"use client";

import Pagination from "@/components/Pagination";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/services/prodcutApi";
import Loading from "./Loading";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { toast } from "sonner";

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
  const productsPerPage = 24;

  // Calculate current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);


  const dispatch = useDispatch();

  // Add to cart handler
  const handleAddToCart = (product: Products) => {
    dispatch(
      addItem({
        product: product._id,
        slug: product.slug,
        title: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0]?.url,
      })
    );
    toast.success(`${product.name} added to cart`);
  };
  // Loading state
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full sm:w-[80%] mx-auto sm:px-4 px-2 py-2">
      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {currentProducts?.map((product: Products) => (
    <div
    key={product._id}
    className="relative group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
  >
    <Link href={`/product/${product.slug}`} className="block">
      <div className="relative">
        {/* Product Image */}
        <Image
          width={300}
          height={300}
          src={product.images[0]?.url}
          alt={product.name}
          className="object-cover sm:h-[230px] h-[180px] w-full"
          loading="lazy"
          placeholder="blur"
          blurDataURL="/placeholder-image.jpg"
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
        <h3 className="text-sm  font-bold sm:font-extrabold text-black">{product.sname}</h3>
  
        {/* Price Details */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-indigo-600 font-bold">৳{product.price}</span>
          {product.mprice > product.price && (
            <span className="text-gray-400 line-through">৳{product.mprice}</span>
          )}
        </div>
      </div>
    </Link>
  
    {/* Add to Cart Button - Hidden by Default, Shown on Hover */}
    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[95%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <button
        onClick={() => handleAddToCart(product)}
        className="w-full py-1 bg-orange-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  </div>
  
        ))}
      </div>
      {/* Pagination */}
  <div className="flex justify-center mt-4">

<Link href={"/products"} >  <Button>Load All Products</Button>
</Link>
  </div>
    </div>
  );
};

export default LatestProduct;
