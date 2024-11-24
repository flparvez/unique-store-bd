import React from 'react'

import ProductByCategory from '@/components/ProductByCategory';
import CategorySlider from '@/components/CategorySlider';

const EditCategory =async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {

  const slug = (await params).slug
  const categoryName = slug.replace(/-/g, ' ').toUpperCase();

  return (
    <div>
 <h1 className="text-2xl font-bold"> Category: {categoryName} </h1>
 <CategorySlider />
    <ProductByCategory slug={slug} />
  
    </div>

  )
}

export default EditCategory
