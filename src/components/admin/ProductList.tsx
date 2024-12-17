"use client"
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
// Define the Product type (reuse the existing Product type)
interface Product {
  _id: string;
  name: string;
  category: {
    slug: string;
  };
  images: { url: string; public_id: string }[];
  price: number;
  slug: string;
}

// Define the ProductList component props type
interface ProductListProps {
  product: Product;
  handleDelete: (id: string) => void;
}
const ProductList: React.FC<ProductListProps> = ({ product, handleDelete }) => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <div>
        <div className="relative">
        <Image width={200} height={200}
            src={product.images[0].url}
            alt="text" 
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
        </div>
        <CardContent>
          <h2 className="text-xl font-bold mb-2 mt-2">{product?.name}</h2>
          <div className="flex justify-between items-center mb-2">
           
        
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Link href={`/admin/product/edit-product/${product?._id}`}>Edit</Link>
         
       
          <Button onClick={() => handleDelete(product?._id)}>Delete</Button>
        </CardFooter>
      </div>
    </Card>
  );
}

export default ProductList;