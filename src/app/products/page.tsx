import AllProducts from '@/components/AllProducts'
import CategorySlider from '@/components/CategorySlider'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'All Products ',
  description: 'Unique Store bd - All Products,',
  keywords: 'Unique Store BD , Unique Store Bd all products ,uniquestorebd , unique store ,  unique product',
}
const Products = () => {
  return (
    <div className='mt-24'>
           <div className="flex justify-center">
        <h1 className="text-2xl font-bold">
          Uniques Store BD <span className="text-xl font-bold">All Products</span>
        </h1>
      </div>
      <CategorySlider />
      <AllProducts />
    </div>
  )
}

export default Products
