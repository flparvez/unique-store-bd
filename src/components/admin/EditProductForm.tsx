"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetCategoriesQuery } from "@/store/services/CategoryApi";
import { cn } from "@/lib/utils";
import { useUpdateProductMutation, useGetProductByIdQuery } from "@/store/services/prodcutApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import RichTextEditor from "@/components/Richtext"; // Import your custom RichTextEditor
import Image from "next/image";

type Category = {
  _id: string;
  name: string;
};
interface Image {
  public_id: string;
  url:string
  
}
type Img={
  public_id:string
  url:string
}
type Inputs = {
  name: string;
  sname: string;
  description: string;
  category: string;
  images: File[];

  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number;
  warranty: string;
  seo: string;
};

export default function UpdateProductForm({ id }: { id: string }) {
  const router = useRouter();
  const { data: categoriesData } = useGetCategoriesQuery("");
  const { data: productData } = useGetProductByIdQuery(id, { skip: !id });
  const categories = categoriesData;
  const [updateProduct] = useUpdateProductMutation();
  const [existingImages, setExistingImages] = useState<Image[]>([]);

  const { register, handleSubmit, setValue } = useForm<Inputs>();

  useEffect(() => {
    if (productData) {
      setValue("name", productData.name);
      setValue("sname", productData.sname);
      setValue("description", productData.description);
      setValue("category", productData.category);
      setValue("price", productData.price);
      setValue("stock", productData.stock);
      setValue("sold", productData.sold);
      setValue("video", productData.video);
      setValue("tags", productData.tags);
      setValue("mprice", productData.mprice);
      setValue("warranty", productData.warranty);
      setValue("seo", productData.seo);
      setExistingImages(productData.images || []);
    }
  }, [productData, setValue]);

  // Register 'description' field manually
  useEffect(() => {
    register("description", { required: true });
  }, [register]);

  const handleDescriptionChange = (value: string) => {
    setValue("description", value);
  };

  const handleImageDelete = (public_id: string) => {
    setExistingImages(existingImages.filter(image => image.public_id !== public_id));
    // You may want to add a call to delete the image from the server here
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("sname", data.sname);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("sold", data.sold.toString());
    formData.append("video", data.video);
    formData.append("tags", data.tags);
    formData.append("mprice", data.mprice.toString());
    formData.append("warranty", data.warranty);
    formData.append("seo", data.seo);

    // Append multiple image files to the form data
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    formData.append("existingImages", JSON.stringify(existingImages));

    const response = await updateProduct({ updatedProduct: formData, id: id }).unwrap();

    if (response) {
      toast.success("Product Updated Successfully");
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-md sm:max-w-[90%] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        {/* Existing input fields */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Product Name</Label>
          <Input {...register("name", { required: true })} id="name" placeholder="Product Name" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="sname">Short Name</Label>
          <Input {...register("sname", { required: true })} id="sname" placeholder="Short Name" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Product Description</Label>
          <RichTextEditor
            content={productData?.description} // Use the watched value from react-hook-form
            onChange={handleDescriptionChange} // Use this to update the form state
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="category">Category</Label>
          <select {...register("category", { required: true })} id="category" className="input">
            {categories?.map((category: Category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="price">Price</Label>
          <Input {...register("price", { required: true })} id="price" placeholder="Price" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="stock">Stock</Label>
          <Input {...register("stock", { required: true })} id="stock" placeholder="Stock" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="sold">Sold</Label>
          <Input {...register("sold", { required: true })} id="sold" placeholder="Sold" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="video">Video URL</Label>
          <Input {...register("video")} id="video" placeholder="Video URL" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="tags">Tags</Label>
          <Input {...register("tags")} id="tags" placeholder="Tags" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="mprice">Market Price</Label>
          <Input {...register("mprice", { required: true })} id="mprice" placeholder="Market Price" type="number" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="warranty">Warranty</Label>
          <Input {...register("warranty")} id="warranty" placeholder="Warranty" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="seo">SEO</Label>
          <Input {...register("seo")} id="seo" placeholder="SEO" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="images">Product Images</Label>
          <Input {...register("images")} id="images" placeholder="Product Images" type="file" multiple />
        </LabelInputContainer>
        <div className="flex flex-wrap gap-2">
          {existingImages?.map((image:Img) => (
            <div key={image.public_id} className="relative">
              <Image width={100}  height={100} src={image.url} alt={image.public_id} className="w-24 h-24 object-cover rounded-md" />
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

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 mt-8 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Update Product &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient: React.FC = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

interface LabelInputContainerProps {
  children: React.ReactNode;
  className?: string;
}

const LabelInputContainer: React.FC<LabelInputContainerProps> = ({ children, className }) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};