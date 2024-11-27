"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import {useGetOrderByIdQuery,useEditOrderMutation} from '../../store/services/CheckOutApi'

import { Label } from '@/components/ui/label';
import { Input } from "@/components/ui/input";

import { useForm } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const OrderInfoPage = ({id}) => {

    const {data} = useGetOrderByIdQuery(id)
  
    const router = useRouter();
 
    
    const {
      register,
      handleSubmit,
      setValue,
     
    } = useForm();
  

        
        // setOrder(data?.order);
  
        // Prepopulate form with current product values
        if (data) {
          setValue("name", data.name);
          setValue("email", data.email);
          setValue("phone", data.phone);
          setValue("address", data.address);
          setValue("city", data.city);
          setValue("status", data.status);
          setValue("transaction", data.transaction);
          setValue("ordertrack", data.ordertrack);
        
        }



    const [editOrder, { isLoading }] = useEditOrderMutation();
// Mutution
const onSubmit = async (data) => {
  await editOrder({ id: id, updatedOrder: data });
  toast("Order Updated");
  if (!data) {
    <h2>Loading...</h2>
  }
  if (!isLoading) {
    router.push("/admin/order");
  }
};

    if (data) {
      const orders = data;
      
    

  return (
    // <h2>Test</h2>
    <div className="container mx-auto px-4 py-8">

    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl  font-semibold mb-4">Order ID: {orders?._id}</h2>
      <div className="mb-4">
        <span className="font-medium">Customer Name:</span> {orders?.name}
      </div>
      <div className="mb-4">
        <span className="font-medium">Email:</span> {orders?.email}
      </div>
      <div className="mb-4">
        <span className="font-medium">Phone:</span> {orders?.phone}
      </div>
      <div className="mb-4">
        <span className="font-medium">Address:</span> {orders?.address}, {orders?.city}
      </div>
      <div className="mb-4">
        <span className="font-medium">Total:</span> ৳{orders?.total?.toFixed(2)}
      </div>
      <div className="mb-4">
        <span className="font-medium">Transaction ID:</span> {orders?.transaction}
      </div>
      <div className="mb-4">
        <span className="font-medium">Status:</span> {orders?.status}
      </div>
      <div className="mb-4">
        <span className="font-bold text-xl">Products:</span>
        <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead >Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
         
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.products?.map((product) => (
          <TableRow key={product.product}>

            <TableCell>{product.title}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>৳{product.price.toFixed(2)}</TableCell>
  
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    
       
      </div>
    </div>

<div>
  <h2 className='text-center text-xl '>Order Details Edit</h2>


  <div className="max-w-md sm:max-w-[90%]  w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
    

  <form className="my-8" onSubmit={handleSubmit(onSubmit)}> 

    <LabelInputContainer className="mb-4 ">
      <Label htmlFor="name">Customer Name</Label>
      <Input {...register("name", { required: true })} id="name" placeholder="Customer Name" type="text" />
      </LabelInputContainer>

 <LabelInputContainer className="mb-4 ">
      <Label htmlFor="email">Customer email</Label>
      <Input {...register("email", { required: true })} id="email" placeholder="Email" type="email" />
      </LabelInputContainer>
 



 <LabelInputContainer className="mb-4 ">
      <Label htmlFor="phone">Customer phone</Label>
      <Input {...register("phone", { required: true })} id="phone" placeholder="phone" type="number" />
      </LabelInputContainer>
 


         <LabelInputContainer className="mb-4 ">
      <Label htmlFor="ordertrack">Order tracking Link</Label>
      <Input {...register("ordertrack", { required: true })} id="ordertrack" placeholder="ordertrack Link" type="text"   />
      </LabelInputContainer>
 

      <LabelInputContainer className="mb-4 ">
      <Label htmlFor="address">Customer address</Label>
      <Input {...register("address", { required: true })} id="address" placeholder="address" type="text" />
      </LabelInputContainer>
 
 <LabelInputContainer className="mb-4 ">
      <Label htmlFor="city">Customer city</Label>
      <Input {...register("city", { required: true })} id="city" placeholder="city" type="text" />
      </LabelInputContainer>
 
 <LabelInputContainer className="mb-4 ">
      <Label htmlFor="status">Customer status</Label>
      <Input {...register("status", { required: true })} id="status" placeholder="status" type="text" />
      </LabelInputContainer>
 

         <LabelInputContainer className="mb-4 ">
      <Label htmlFor="status">Customer transaction</Label>
      <Input {...register("transaction", { required: true })} id="transaction" placeholder="transaction" type="text" />
      </LabelInputContainer>
 

        

      

    <button
      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
      type="submit"
    >
      Update Order &rarr;
      <BottomGradient />
    </button>

    
  </form>
</div>
    

</div>

  </div>
  )
}else{
  return <h1>Loading...</h1>
}
}
export default OrderInfoPage

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
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};