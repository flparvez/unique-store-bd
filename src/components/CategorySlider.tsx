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
import { Button } from './ui/button';

// Define the Category type
interface Category {
  _id: string;
  name: string;
  image: string;
  slug: string;
}

const CategorySlider: React.FC = () => {
  const { data } = useGetCategoriesQuery("");

  return (
    <div className='w-full sm:w-[60%] justify-center mx-auto mt-2'>

<div className='justify-center text-center'>
<Button variant={'secondary'} className='mb-2 '>Category</Button>
</div>
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
          400: { slidesPerView: 3 }, // For small screens
          768: { slidesPerView: 4 }, // For tablets
          1024: { slidesPerView: 4 }, // For desktops
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <div className="container mx-auto px-2">
          <div className="flex overflow-x-scroll scrollbar-hide">
            {data?.map((category: Category) => (
              <SwiperSlide key={category._id}>
                <div className="flex-shrink-0 w-[150px] h-[200px] bg-white rounded-lg  overflow-hidden">
                  <Link href={`/products/${category.slug}`}>
                    <Image
                      width={150}
                      height={140}
                      src={category.image}
                      alt={category.name}
                      className=" object-cover rounded"
                    />
                    <div className="p-2">
                      <h3 className="text-lg font-semibold text-center">{category.name}</h3>
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
