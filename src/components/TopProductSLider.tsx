"use client"

// import SwiperSlides from '@/components/SwiperSlide'
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import SwiperSlides from './SwiperSlides'
// import Loading from '@/components/Loading'

const TopProductSLider = () => {
  const {data} = useGetProductsQuery("")
  
  const productsSlider = data?.slice(12, 23);

  return (
    <div>
      
      <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
 
 {/* Featured Products And Category With Link */}
   <div className="sm:w-[70%] justify-center mx-auto h-full">

 
                <SwiperSlides
                
                  products= {productsSlider}
                  
                />

           
              </div>
    </div>
  )
}

export default TopProductSLider
