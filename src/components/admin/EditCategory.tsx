"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditCategoryMutation } from "@/store/services/CategoryApi";
import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface EditCategoryProps {
  slug: string;
}

interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

const EditCategory: React.FC<EditCategoryProps> = ({ slug }) => {
 
  const router = useRouter();

  const { register, handleSubmit, setValue } = useForm<Category>();

  useEffect(() => {
    async function fetchCategory() {
      const res = await fetch(`https://uniquestorebd-api.vercel.app/api/categories/${slug}`);
      const data = await res.json();
    

      // Prepopulate form with current category values
      if (data) {
        setValue("name", data.name);
        setValue("image", data.image);
      }
    }
    fetchCategory();
  }, [slug, setValue]);

  const [editCategory, { isLoading }] = useEditCategoryMutation();

  const onSubmit = async (data: Category) => {
    const categoryUpdate = await editCategory({ slug:slug, updatedCategory: data }).unwrap();
    if (categoryUpdate) {
      toast.success("Category Updated");
      router.push('/admin/category');
    }

    if (!isLoading) {
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
          <Label htmlFor="images">Image Link</Label>
          <Input {...register("image")} id="images" placeholder="Image Link" type="text" />
        </LabelInputContainer>

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
