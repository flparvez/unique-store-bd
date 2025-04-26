"use client";
import React from 'react';
import { useDeleteOrderMutation, useGetOrdersQuery } from '../../store/services/CheckOutApi'; 

import {
    Table,
    TableBody,
  
    TableCell,
  
    TableHead,
    TableHeader,
    TableRow,
  } from "../../components/ui/table"
import Link from 'next/link';


const OrderList = () => {


  const { data:orderData, isLoading, isError } = useGetOrdersQuery(); 

  const [deleteOrder] = useDeleteOrderMutation();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading orders.</p>;

  const handleDelete = async (id) => {
    await deleteOrder({id}).unwrap();
    };
    if (!orderData) {
      return <h2 className='mt-32'>No orders found</h2>
    }
  return (

 
    <div className="container mx-auto p-4">


    <div className="sm:container mx-auto sm:px-4 py-8 px-2">
   
    <div className="overflow-x-auto">
    <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Delete</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderData &&  orderData?.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium"><Link href={`/admin/order/${invoice._id}`}>{invoice?.orderId}</Link></TableCell>
            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell><button onClick={() => handleDelete(invoice?._id)}>Delete</button></TableCell>
  
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    
    </div>
  </div>
  </div>
    
  
    
  )
}

export default OrderList