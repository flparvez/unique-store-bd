"use client";

import React from 'react';
import { useDeleteProductMutation, useGetProductsQuery } from "@/store/services/prodcutApi";
import { toast } from "sonner";
import ProductList from "./ProductList";

// Define the Product type
interface Product {
  _id: string;
  name: string;
  category: {
    slug: string;
  };
  images: string;
  price: number;
  slug: string;
}

// Define the ProductList component props type
// interface ProductListProps {
//   product: Product;
//   handleDelete: (id: string) => void;
// }

const Dashboard: React.FC = () => {
  const { data } = useGetProductsQuery("");
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    await deleteProduct({ id }).unwrap();
    toast.error("Product Deleted");
  };

  return (
    <div>
      <h2>Dashboard Details</h2>
      <div>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {data && data.length > 0
            ? data.map((productItem: Product) => (
                <div key={productItem._id}>
                  <ProductList 
                    product={productItem}
                    handleDelete={handleDelete}
                  />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
