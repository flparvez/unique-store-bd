"use client";

import { useGetProductsQuery } from '@/store/services/prodcutApi';
import SwiperSlides from './SwiperSlides';

const TopProductSlider = () => {
  const { data } = useGetProductsQuery("");

  // Slice the product data for the slider
  const productsSlider = data?.slice(9, 23);

  return (
    <div className="w-full h-full">
      <div className="sm:w-[70%] mx-auto">
        {/* Swiper Slider for Featured Products */}
        {productsSlider && <SwiperSlides products={productsSlider} />}
      </div>
    </div>
  );
};

export default TopProductSlider;
