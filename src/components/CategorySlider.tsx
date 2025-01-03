"use client"

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useGetCategoriesQuery } from '@/store/services/CategoryApi';
import Image from 'next/image';
import Link from 'next/link';


// Define the Category type
interface Category {
  _id: string;
  name: string;
 images: { url: string; public_id: string }[]
  slug: string;
}

const CategorySlider: React.FC = () => {
  const { data } = useGetCategoriesQuery("");

  return (
    <div className='w-full bg-[#ffe9e7] sm:w-[70%] justify-center sm:h-[160px]  h-[150px] mx-auto '>


       <Swiper
        scrollbar={{ draggable: true }}
        parallax={true}
        autoplay={{
          delay: 4200,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 }, // For very small screens
          300: { slidesPerView: 2 }, // For very small screens
          360: { slidesPerView: 3 }, // For small screens
          768: { slidesPerView: 4 }, // For tablets
          1024: { slidesPerView: 7 }, // For desktops
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="container mx-auto  bg-[#ffe9e7] ">
          <div className="flex overflow-x-scroll  ">
            {data?.map((category: Category) => (
              <SwiperSlide key={category._id}>
             <div className="flex-shrink-0 bg-[#ffe9e7] overflow-hidden">
  <Link href={`/products/${category.slug}`}>
  <div className="relative">
  <Image
    width={300}
    height={300}
    src={category.images[0].url}
    alt={category.name}
    className="object-cover rounded"
  />
  <div className="absolute bottom-0 left-0 w-full py-1 rounded-b">
    <h3 className="text-sm font-semibold text-red-500 text-center">
      {category.name}
    </h3>
  </div>
</div>

  </Link>
</div>

              </SwiperSlide>
            ))}
          </div>
        </div>
      </Swiper>
    </div>
  );
}

export default CategorySlider;
