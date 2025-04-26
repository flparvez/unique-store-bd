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
    <div className='mt-11 sm:mt-13'>
           <div className="text-center">
        <h1 className="text-xl sm:text-2xl font-bold mb-1">
          Uniques Store BD <span className="text-xl font-bold">All Products</span>
        </h1>
        <p className='text-sm font-bold sm:font-extrabold text-center'>Online Shopping BD. <span className='font-bold text-red-600'>Unique Store BD</span>.  Enjoy hassle-free online shopping from Unique Store BD. Find genuine products,  TWS earbuds, unique gadgets, home appliances, and daily essentials</p>
      </div>
      <CategorySlider />
      <AllProducts />
    </div>
  )
}

export default Products
