"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useGetCategoriesQuery } from "@/store/services/CategoryApi";
import { cn } from "@/lib/utils";
import { useAddProductMutation } from "@/store/services/prodcutApi";
import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "sonner";
import RichTextEditor from "@/components/Richtext"; // Import your custom RichTextEditor


type Category = {
  _id: string;
  name: string;
};


type Inputs = {
  name: string;
  description: string; // Updated to string type
  category: string;
  images: string;
  price: number;
  stock: number;
  sold: number;
  video: string;
  tags: string;
  mprice: number; // Added new field
  warrenty: string; // Added new field
};

export default function AddProductForm () {

  const router = useRouter();

  const { data } = useGetCategoriesQuery("");
  const categories = data;
  const [addProduct] = useAddProductMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
  } = useForm<Inputs>();

  // Register 'description' field manually
  React.useEffect(() => {
    register("description", { required: true });
  }, [register]);

  const handleDescriptionChange = (value: string) => {
    setValue("description", value); // Manually set the value in React Hook Form
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
    const product = await addProduct({ body: { ...data, description: data.description } }).unwrap();
    if (product) {
      toast.success("Product Created Successfully");
      router.push("/admin");
    }
  };

  return (
    <div className="max-w-md sm:max-w-[90%] w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Product Name</Label>
          <Input
            {...register("name", { required: true })}
            id="name"
            placeholder="Product Name"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="description">Product Description</Label>
          <RichTextEditor
            content={watch("description")} // Use the watched value from react-hook-form
            onChange={handleDescriptionChange} // Use this to update the form state
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="category">Category</Label>
          <select {...register("category", { required: true })} className="select">
            {categories?.map((category:Category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="tags">Tags</Label>
          <select {...register("tags", { required: true })} className="select">
          
              <option  value={"all"}> All</option>
              <option  value={"best-sell"}>Best Sell</option>
        
          </select>
        </LabelInputContainer>



        <LabelInputContainer className="mb-4">
          <Label htmlFor="images">Image Link</Label>
          <Input
            {...register("images", { required: true })}
            id="images"
            placeholder="Image Link"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="price">Product Price</Label>
          <Input
            {...register("price", { required: true })}
            id="price"
            placeholder="Product Price"
            type="number"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="mprice">Market Price</Label>
          <Input
            {...register("mprice", { required: true })}
            id="mprice"
            placeholder="Market Price"
            type="number"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4 mt-4">
          <Label htmlFor="stock">Product Stock</Label>
          <Input
            {...register("stock", { required: true })}
            id="stock"
            placeholder="Product stock"
            type="number"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="video">Product Video</Label>
          <Input
            {...register("video")}
            id="video"
            placeholder="Product Video Link"
            type="text"
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="sold">Product Sold</Label>
          <Input
            {...register("sold", { required: true })}
            id="sold"
            placeholder="Product Sold"
            type="number"
          />
        </LabelInputContainer>

       
        <LabelInputContainer className="mb-4">
          <Label htmlFor="warrenty">Warrenty</Label>
          <Input
            {...register("warrenty", { required: true })}
            id="warrenty"
            placeholder="warrenty Information"
            type="text"
          />
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Add Product &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};