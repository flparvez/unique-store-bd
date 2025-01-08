import AllProducts from '@/components/AllProducts'
import CategorySlider from '@/components/CategorySlider'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'All Products ',
  description: 'ALl Products - Unique Store BD',
  keywords: 'Unique Store BD , Unique Store BD all products ,uniquestorebd , unique store ,  unique product',
}
const Products = () => {
  return (
    <div className='mt-24'>

      <CategorySlider />
      <AllProducts />
    </div>
  )
}

export default Products
