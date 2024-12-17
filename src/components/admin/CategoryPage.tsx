"use client"
import Image from 'next/image'
import React from 'react'
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@/store/services/CategoryApi';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import Link from 'next/link';
interface Category {
    _id: string;
    name: string;
    image: {
      url: string;
    };
    images: {
      url: string;
    }[];
    slug: string;
  }
  
const CategoryPage = () => {

    const { data } = useGetCategoriesQuery("");
    const [deleteCategory] = useDeleteCategoryMutation();
  
    // Delete Category
    const handleDelete = async (id: string) => {
      try {
        await deleteCategory({ id }).unwrap();
        toast.error("Category Deleted");
      } catch (error) {
        console.error("Failed to delete category:", error);
        toast.error("Failed to delete category");
      }
    };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
    {data && data.length > 0 ? data.map((category: Category) => (
      <div key={category._id}>
        <Card className="w-full max-w-sm mx-auto">
          <div>
            <div className="relative">
              <Image
                width={200}
                height={200}
                src={category.images[0].url}
                alt={category.name}
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
            </div>
            <CardContent>
              <h2 className="text-xl font-bold mb-2 mt-2">{category.name}</h2>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Link href={`/admin/category/edit-category/${category.slug}`}>Edit</Link>
              <Button onClick={() => handleDelete(category._id)}>Delete</Button>
            </CardFooter>
          </div>
        </Card>
      </div>
    )) : null}
  </div>
  )
}

export default CategoryPage
