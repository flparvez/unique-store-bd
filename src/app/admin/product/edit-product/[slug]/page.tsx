import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';
import EditProductForm from '@/components/admin/EditProductForm';
const EditProduct = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const slug = (await params).slug
 
  return (
  <DashboardLayout>
 <h1 className="text-2xl font-bold">Edit Product</h1>
    <div>
      <EditProductForm slug={slug}  />
    </div>
  </DashboardLayout>
  )
}

export default EditProduct
