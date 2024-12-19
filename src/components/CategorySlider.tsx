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
    <div className='w-full bg-[#ffe9e7] sm:w-[60%] justify-center sm:h-[215px]  h-[185px] mx-auto mt-2'>


       <Swiper
        
        parallax={true}
        autoplay={{
          delay: 2900,
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
          1024: { slidesPerView: 4 }, // For desktops
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="container mx-auto  bg-[#ffe9e7] ">
          <div className="flex overflow-x-scroll scrollbar-hide ">
            {data?.map((category: Category) => (
              <SwiperSlide key={category._id}>
                <div className="flex-shrink-0  bg-[#ffe9e7]   overflow-hidden">
                  <Link href={`/products/${category.slug}`}>
                   <div className='sm:ml-14 mt-2 ml-[18px]'>
                   <Image
                      width={150}
                      height={140}
                      src={category.images[0].url}
                      alt={category.name}
                      className=" object-cover  rounded"
                    />
                   </div>
                    <div className="p-4">
                      <h3 className="sm:text-lg text-sm font-semibold text-center">{category.name}</h3>
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
