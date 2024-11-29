"use client"

import dynamic from 'next/dynamic'
import Loading from './Loading'
import { Button } from './ui/button'
const DynamicTopProductSlider = dynamic(() => import('./TopProductSLider'), {
  loading: () =><Loading />,
  ssr: false
})
const DynamicLatestProductSlider = dynamic(() => import('./LatestProduct'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const DynamicCategorySlider = dynamic(() => import('./CategorySlider'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const DynamicTopSellingProduct = dynamic(() => import('./TopSellingProduct'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})



const HomePage = () => {
  return (
    <div className='mt-[75px]'>
     
      {/* Slider */}
      <DynamicTopProductSlider />

      {/* Special Product Bannar/ Product */}

<DynamicCategorySlider />

{/* Latest Product 16 Product With Pagination */}
<div className='flex justify-center'>
       <Button >Latest Product</Button>
  
    </div>
<DynamicLatestProductSlider   />

{/* Top Selling Product */}
<div className='flex justify-center'>
        <Button>Top Selling Products</Button>
  
    </div>
<DynamicTopSellingProduct />
    </div>
  )
}

export default HomePage
