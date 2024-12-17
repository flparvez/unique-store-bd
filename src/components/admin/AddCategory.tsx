"use client";
import { useForm, SubmitHandler } from "react-hook-form";

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { useAddCategoryMutation } from "@/store/services/CategoryApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";


type Inputs = {
    id: string,
    name: string;
    images: File[];

};

export default function AddCategoryForm() {

  const router= useRouter()
    const [addCategory] = useAddCategoryMutation();
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();
 
 const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
 


    // Append multiple image files to the form data
    Array.from(data.images).forEach((image) => {
      formData.append("images", image);
    });

    const product = await addCategory({ body: formData }).unwrap();
    if (product) {
      toast.success("Product Created Successfully");
      router.push("/admin/category");
    }
  };                                  
  // console.log(watch("name")); // watch input value by passing the name of it

  return (
    



  <div className="max-w-md sm:max-w-[90%]  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    

  <form className="my-8" onSubmit={handleSubmit(onSubmit)}> 

    <LabelInputContainer className="mb-4 ">
      <Label htmlFor="name">Category Name</Label>
      <Input {...register("name", { required: true })} id="name" placeholder="Category Name" type="text" />
      </LabelInputContainer>
 
 
      <LabelInputContainer className="mb-4">
               <Label htmlFor="images">Product Images</Label>
               <Input
                 {...register("images", { required: true })}
                 id="images"
                 type="file"
                 multiple
               />
             </LabelInputContainer>
 

      
        

      

    <button
      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type="submit"
    >
      Add Category &rarr;
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
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};