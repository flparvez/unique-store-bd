"use client"
import { useGetOrderByIdQuery } from '@/store/services/CheckOutApi'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import Link from 'next/link';
const OrderInformationPage = ({id}) => {
  const {data:order} = useGetOrderByIdQuery(id)

  

if (order) {
  return (
    <div className="container mx-auto px-4 py-8">
       <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-md shadow-md text-center">
      <h3 className="text-lg font-semibold">অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!</h3>
      <p className="mt-2">আপনার অর্ডার আইডি: <span className="font-bold">{order?.orderId}</span></p>
    </div>

    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl  font-semibold mb-4">Order ID: {order?.orderId}</h2>
      <div className="mb-4">
        <span className="font-medium">Customer Name:</span> {order.name}
      </div>   
      
       <div className="mb-4">
        <span className="font-medium">Tracking number:</span> <Link href={order.ordertrack}>Tracking Link</Link>
      </div>  
      {
        order.paymentType === "partial" ?   <div className="mb-4">
        <span className="font-medium">Pay Cash On Delivery:</span> {order.total -200} Tk
      </div> : ""
      }
      
      <div className="mb-4">
        <span className="font-medium">Email:</span> {order.email}
      </div>
      <div className="mb-4">
        <span className="font-medium">Phone:</span> {order.phone}
      </div>
      <div className="mb-4">
        <span className="font-medium">Address:</span> {order.address}, {order.city}
      </div>
      <div className="mb-4">
        <span className="font-medium">Total:</span> ৳{order.total.toFixed(2)}
      </div>
      <div className="mb-4">
        <span className="font-medium">Transaction ID:</span> {order.transaction}
      </div>
      <div className="mb-4">
        <span className="font-medium">Status:</span> {order.status}
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
        {order?.products?.map((product) => (
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
  </div>
  )
}
}

export default OrderInformationPage
