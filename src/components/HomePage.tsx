import React from 'react'
import TopProductSLider from './TopProductSLider'
import CategorySlider from './CategorySlider'
import LatestProduct from './LatestProduct'
import TopSellingProduct from './TopSellingProduct'

const HomePage = () => {
  return (
    <div>
      {/* Slider */}
      <TopProductSLider />

      {/* Special Product Bannar/ Product */}

<CategorySlider />

{/* Latest Product 16 Product With Pagination */}
<div className='flex justify-center'>
        <button className='py-3 px-6 mt-14 text-white bg-black rounded-md'>Latest Products</button>
  
    </div>
<LatestProduct   />

{/* Top Selling Product */}
<TopSellingProduct />
    </div>
  )
}

export default HomePage
