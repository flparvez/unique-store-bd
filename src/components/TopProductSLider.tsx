"use client"

// import SwiperSlides from '@/components/SwiperSlide'
import { useGetProductsQuery } from '@/store/services/prodcutApi'
import SwiperSlides from './SwiperSlides'
import { Button } from './ui/button'
// import Loading from '@/components/Loading'

const TopProductSLider = () => {
  const {data} = useGetProductsQuery("")
  
  const productsSlider = data?.slice(12, 23);

  return (
    <div >
      
      <h2 className="text-xl font-bold text-center ">
          <Button>Featured Product</Button>
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
