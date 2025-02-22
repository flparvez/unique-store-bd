"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/services/prodcutApi";
import Loading from "./Loading";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { toast } from "sonner";
import { Button } from "./ui/button";

type Products = {
  _id: string;
  slug: string;
  name: string;
  sname: string;
  description: string;
  category: string;
  images: {
    url: string;
  }[];
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number;
  warrenty: string;
};

const AllProducts = () => {
  const { data: products, isLoading } = useGetProductsQuery("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 32;

  // Calculate current products for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto sm:px-4 px-2 py-3">
      <div className="flex justify-center">
        <h1 className="text-2xl font-bold">
          Unique Store BD <span className="text-xl font-bold">All Products</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {currentProducts?.map((product: Products) => (
          <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
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
              <h3 className="text-sm block text-black sm:text-xl font-bold">{product.sname}</h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-indigo-600 font-bold">৳{product.price}</span>
                <span className="text-gray-500 line-through">৳{product.mprice}</span>
              </div>
              
            </div>
            </Link>
            <Button
              onClick={() => handleAddToCart(product)} // Pass the product object
              className="w-full   bg-orange-600 text-white  hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil((products?.length || 0) / productsPerPage)}
        onPageChange={paginate}
      />
    </div>
  );
};

export default AllProducts;
