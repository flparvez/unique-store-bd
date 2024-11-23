"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const SwiperSlides = ({products}) => {

  return (
   <div>
  <Swiper
        // spaceBetween={30}
        centeredSlides={true}
        parallax={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          540: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          968: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
      {products && products?.map((product) => (
        <SwiperSlide key={product._id}>
           <div className="w-full max-w-sm mx-auto">
            <Link href={`/product/${product.slug}`}>
            <div className=" overflow-hidden">
            <Image width={300} height={300}
            src={product.images}
            alt="text" 
            className="w-full h-[300px] object-cover rounded-t-lg"
          />
            </div>
            <h3 className="text-xl font-bold mb-2 mt-2 text-center">{product.name}</h3>
            <p className="text-gray-500 mb-2 text-center">{product.category.name}</p>
            <p className="text-lg font-bold text-center">৳{product.price}</p>
            </Link>
          </div>

        </SwiperSlide>
      ))}
    </Swiper>
   </div>
  )
}

export default SwiperSlides