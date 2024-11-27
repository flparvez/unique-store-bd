import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';
import AddCategoryForm from '@/components/admin/AddCategory';
const AddCategory = () => {
  return (
  <DashboardLayout>

    <div>
     <AddCategoryForm />
    </div>
  </DashboardLayout>
  )
}

export default AddCategory
