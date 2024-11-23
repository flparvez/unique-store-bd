"use client"

// import SwiperSlides from '@/components/SwiperSlide'
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import SwiperSlides from './SwiperSlides'
// import Loading from '@/components/Loading'

const TopProductSLider = () => {
  const {data} = useGetProductsQuery("")
  
  const productsSlider = data?.slice(0, 20);

  return (
    <div>
      
      <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
 
 {/* Featured Products And Category With Link */}
   <div className="">

 
                <SwiperSlides
                
                  products= {productsSlider}
                  
                />

           
              </div>
    </div>
  )
}

export default TopProductSLider
