import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';
import EditCategoryForm from '@/components/admin/EditCategory';
const EditCategory =async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const slug = (await params).slug

  return (
  <DashboardLayout>
 <h1 className="text-2xl font-bold">Edit Category</h1>
    <div>
   <EditCategoryForm slug={slug} />
    </div>
  </DashboardLayout>
  )
}

export default EditCategory
