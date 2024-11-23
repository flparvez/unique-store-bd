"use client";

import React from 'react';
import { useGetProductsQuery } from "@/store/services/prodcutApi";

// Define the Product type
interface Product {
  _id: string;
  name: string;
  category: {
    slug: string;
  };
}

// Define the component props type
interface ProductByCategoryProps {
  slug: string;
}

const ProductByCategory: React.FC<ProductByCategoryProps> = ({ slug }) => {
  const { data } = useGetProductsQuery("");

  // Filter products by category slug
  const filterProducts = data?.filter((product: Product) => product?.category?.slug === slug);

  console.log(filterProducts);

  return (
    <div>
      <h2>All Products By Category</h2>
      {filterProducts?.map((product: Product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
        </div>
      ))}
    </div>
  );
}

export default ProductByCategory;
