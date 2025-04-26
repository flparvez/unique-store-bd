import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';
import AddProductForm from '@/components/admin/ProductAddPage';
const AddProduct = () => {
  return (
  <DashboardLayout>
 <h1 className="text-2xl font-bold">Add Product</h1>
    <div>
  
      <AddProductForm />
    </div>
  </DashboardLayout>
  )
}

export default AddProduct
