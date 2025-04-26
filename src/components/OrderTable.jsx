"use client"



import React from 'react';

import Link from 'next/link';
import {
  Table,
  TableBody,

  TableCell,

  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"





const OrderTable = ({orders}) => {



  return (
    <div >
    
    <h1 className="sm:text-3xl text-xl font-bold text-center mb-8">My Orders</h1>
    <Table>
      
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Order Id</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer Name</TableHead>
          <TableHead>Status</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((invoice) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium"><Link href={`/profile/orders/${invoice._id}`}>{invoice.orderId}</Link></TableCell>
            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.status}</TableCell>
  
          </TableRow>
        ))}
      </TableBody>
      
    </Table>
    
    </div>
 
  );
};

export default OrderTable;