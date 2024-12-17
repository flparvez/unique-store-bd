import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';
import EditProductForm from '@/components/admin/EditProductForm';
const EditProduct = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id
 
  return (
  <DashboardLayout>
 <h1 className="text-2xl font-bold">Edit Product</h1>
    <div>
      <EditProductForm id={id}  />
    </div>
  </DashboardLayout>
  )
}

export default EditProduct
