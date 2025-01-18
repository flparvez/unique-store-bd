"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategoriesQuery } from "@/store/services/CategoryApi";
import { useUpdateProductMutation, useGetProductByIdQuery } from "@/store/services/prodcutApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import RichTextEditor from "@/components/Richtext";

type Img = {
  public_id: string;
  url: string;
};

type Category = {
  _id: string;
  name: string;
};

interface Inputs {
  name: string;
  sname: string;
  description: string;
  category: string;
  images: FileList | null;
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number;
  warranty: string;
  seo: string;
}

export default function UpdateProductForm({ id }: { id: string }) {
  const router = useRouter();
  const { data: categoriesData } = useGetCategoriesQuery("");
  const { data: productData } = useGetProductByIdQuery(id, { skip: !id });
  const [updateProduct] = useUpdateProductMutation();
  const [existingImages, setExistingImages] = useState<Img[]>([]);

  const { register, handleSubmit, setValue, watch } = useForm<Inputs>();

  // Populate form with product data
  useEffect(() => {
    if (productData) {
      setExistingImages(productData.images || []);
      const {
        name,
        sname,
        description,
        category,
        price,
        stock,
        sold,
        video,
        tags,
        mprice,
        warranty,
        seo,
      } = productData;
      setValue("name", name);
      setValue("sname", sname);
      setValue("description", description);
      setValue("category", category._id);
      setValue("price", price);
      setValue("stock", stock);
      setValue("sold", sold);
      setValue("video", video);
      setValue("tags", tags);
      setValue("mprice", mprice);
      setValue("warranty", warranty);
      setValue("seo", seo);
    }
  }, [productData, setValue]);

  const handleDescriptionChange = (value: string) => {
    setValue("description", value);
  };

  const handleImageDelete = (public_id: string) => {
    setExistingImages((prev) => prev.filter((image) => image.public_id !== public_id));
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    // Append text data
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value as string);
      }
    });

    // Append existing images
    formData.append("existingImages", JSON.stringify(existingImages));

    // Append new images
    if (data.images) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    }

    try {
      await updateProduct({ updatedProduct: formData, id }).unwrap();
      toast.success("Product Updated Successfully");
      router.push("/admin");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Try again!");
    }
  };


  return (
    <div className="max-w-md sm:max-w-[90%] w-full mx-auto rounded-md p-4 shadow-input bg-white dark:bg-black">
      <form onSubmit={handleSubmit(onSubmit)}>
     {/* Input Fields */}

    {/* Existing input fields */}
    <LabelInputContainer >
          <Label htmlFor="name" className="mt-2">Product Name</Label>
          <Input {...register("name", { required: true })} id="name" placeholder="Product Name" type="text" />
        </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="sname" className="mt-2">Short Name</Label>
          <Input {...register("sname", { required: true })} id="sname" placeholder="Short Name" type="text" />
        </LabelInputContainer>
   <LabelInputContainer >
   <Label htmlFor="description" className="mt-2">Product Description</Label>
          <RichTextEditor
            content={watch("description")}
            onChange={handleDescriptionChange}
          />
        </LabelInputContainer>


        <LabelInputContainer>
          <Label htmlFor="category" className="mt-2">Category</Label>
          <select
            {...register("category", { required: true })}
            id="category"
            className="select"
            defaultValue={productData?.category?._id || ""}
          >
            <option value="" disabled>
              Select Category
            </option>
            {categoriesData?.map((category: Category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </LabelInputContainer>

      
        <LabelInputContainer >
          <Label htmlFor="price" className="mt-2">Price</Label>
          <Input {...register("price", { required: true })} id="price" placeholder="Price" type="number" />
        </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="stock" className="mt-2">Stock</Label>
          <Input {...register("stock", { required: true })} id="stock" placeholder="Stock" type="number" />
        </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="sold" className="mt-2">Sold</Label>
          <Input {...register("sold", { required: true })} id="sold" placeholder="Sold" type="number" />
        </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="video"  className="mt-2">Video URL</Label>
          <Input {...register("video")} id="video" placeholder="Video URL" type="text" />
        </LabelInputContainer>
            <LabelInputContainer >
              <Label htmlFor="tags" className="mt-2">Tags</Label>
              <select {...register("tags", { required: true })} className="select">
                <option value={"all"}> All</option>
                <option value={"best-sell"}>Best Sell</option>
              </select>
            </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="mprice" className="mt-2">Market Price</Label>
          <Input {...register("mprice", { required: true })} id="mprice" placeholder="Market Price" type="number" />
        </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="warranty" className="mt-2">Warranty</Label>
          <Input {...register("warranty")} id="warranty" placeholder="Warranty" type="text" />
        </LabelInputContainer>
        <LabelInputContainer >
          <Label htmlFor="seo" className="mt-2">SEO</Label>
          <Textarea {...register("seo")} id="seo" placeholder="SEO" aria-setsize={8} />
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="images" className="mt-2">Product Images</Label>
          <Input {...register("images")} id="images" placeholder="Product Images" type="file" multiple />
        </LabelInputContainer>

        {/* Existing Images */}
        <div className="flex flex-wrap gap-2 mt-2">
          {existingImages.map((image) => (
            <div key={image.public_id} className="relative">
              <Image
                width={100}
                height={100}
                src={image.url}
                alt={image.public_id}
                className="w-24 h-24 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() => handleImageDelete(image.public_id)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                &times;
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full mt-4 bg-blue-500 text-white rounded-md p-2">
          Update Product
        </button>
      </form>
    </div>
  );
}

const LabelInputContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col space-y-2 w-full">{children}</div>
);
