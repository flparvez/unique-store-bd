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
<h1>Special Product Bannar Static</h1>
{/* CategorySlider */}
<CategorySlider />

{/* Latest Product 16 Product With Pagination */}
<LatestProduct />

{/* Top Selling Product */}
<TopSellingProduct />
    </div>
  )
}

export default HomePage
