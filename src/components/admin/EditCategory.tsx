"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditCategoryMutation } from "@/store/services/CategoryApi";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Image from "next/image";
import { Textarea } from "../ui/textarea";

interface EditCategoryProps {
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  tags: string;
  images: File[]
  slug: string;
}
interface Image {
  public_id: string;
  url:string
  
}
type Img={
  public_id:string
  url:string
}
const EditCategory: React.FC<EditCategoryProps> = ({ slug }) => {
 
  const router = useRouter();
  const [existingImages, setExistingImages] = useState<Image[]>([]);
  const { register, handleSubmit, setValue } = useForm<Category>();

  useEffect(() => {
    async function fetchCategory() {
      const res = await fetch(`https://uniquestorebd-api.vercel.app/api/categories/${slug}`);
      // const res = await fetch(`https://Unique Store BD-api.vercel.app/api/categories/${slug}`);
      const data = await res.json();
    

      // Prepopulate form with current category values
      if (data) {
        setValue("name", data.name);
        setValue("description", data.description);
        setValue("tags", data.tags);
        setExistingImages(data.images || []);
      }
    }
    fetchCategory();
  }, [slug, setValue]);
  const handleImageDelete = (public_id: string) => {
    setExistingImages(existingImages.filter(image => image.public_id !== public_id));
    // You may want to add a call to delete the image from the server here
  };
  const [editCategory, { isLoading }] = useEditCategoryMutation();
 const onSubmit: SubmitHandler<Category> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("tags", data.tags);
 

    // Append multiple image files to the form data
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    formData.append("existingImages", JSON.stringify(existingImages));

    const response = await editCategory({ slug:slug, updatedCategory: formData }).unwrap();

    if (response) {
      toast.success("Product Updated Successfully");
      router.push("/admin/category");
    }
  };



  return (
    <div className="max-w-md sm:max-w-[90%] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Category Name</Label>
          <Input {...register("name", { required: true })} id="name" placeholder="Category Name" type="text" />
        </LabelInputContainer>
         <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Category description</Label>
          <Input {...register("description", )} id="description" placeholder="Category description" type="text" />
        </LabelInputContainer>
 


        <LabelInputContainer className="mb-4 ">
      <Label htmlFor="tags">Category tags</Label>
      <Textarea {...register("tags", { required: true })} id="tags" placeholder="Category Seo Tags"  />
      </LabelInputContainer>
 
               <LabelInputContainer className="mb-4">
                 <Label htmlFor="images">Product Images</Label>
                 <Input {...register("images")} id="images" placeholder="Product Images" type="file" multiple />
               </LabelInputContainer>
               <div className="flex flex-wrap gap-2">
      {/* Your component JSX */}
      {existingImages.map((image) => (
        <div key={image.public_id}>
          <Image width={80} height={80} src={image.url} alt="Image" />
          <button onClick={() => handleImageDelete(image.public_id)}>Delete</button>
        </div>
      ))}
    </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Update Category &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
};

export default EditCategory;

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
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
