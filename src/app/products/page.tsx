import AllProducts from '@/components/AllProducts'
import CategorySlider from '@/components/CategorySlider'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'All Products - Unique Store Bd',
  description: 'ALl Products - Unique Store Bd',
}
const Products = () => {
  return (
    <div>
  
      <CategorySlider />
      <AllProducts />
    </div>
  )
}

export default Products
