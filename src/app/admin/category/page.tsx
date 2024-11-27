
import React from 'react';

import DashboardLayout from '@/components/admin/DashboardLayout';
import Link from 'next/link';

// import CategoryPage from '@/components/admin/CategoryPage';
import dynamic from 'next/dynamic';
const DynamicCategoryPage = dynamic(() => import('@/components/admin/CategoryPage'), {
  loading: () => <p>Loading...</p>,
})
const Category = () => {
 

  return (
    <DashboardLayout>
  <div className='mt-14'>
     
      <Link href="/admin/category/add-category">
        <h1 className="text-2xl font-bold">Add Category</h1>
      </Link>
  <DynamicCategoryPage />

  </div>
  </DashboardLayout>
  );
};

export default Category;
