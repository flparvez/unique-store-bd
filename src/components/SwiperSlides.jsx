"use client";

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';

const SwiperSlides = ({ products }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Truncate text utility
  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.substring(0, maxLength) : text;

  if (!mounted) return null;

  return (
    <div className="swiper-container">
      <Swiper
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          350: { slidesPerView: 1 },
          490: { slidesPerView: 3 },
          550: { slidesPerView: 3 },
  
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products?.map((product) => (
          <SwiperSlide className='flex-shrink-0' key={product._id}>
            <Link href={`/product/${product.slug}`}>
              <div className="w-full hover:scale-95 ]  mx-auto my-2">
                <div className="overflow-hidden text-center">
                  <Image
                    width={500}
                    height={500}
                    src={product.images[0].url}
                    alt={product.name}
                    className="object-cover w-full sm:h-[330px]  h-[300px] hover:animate-pulse"
                    loading="lazy"
                  />
             

                       <div className="absolute top-0 left-0 flex justify-end w-full  py-1 rounded-b">
                <h3 className="text-sm sm:text-lg w-20 text-center bg-indigo-500 text-white font-bold  "> Featured</h3>

              </div>
              <div className="absolute top-0 left-0 w-full flex justify-center  py-1 rounded-b">
              <p className="text-lg ml-20 mt-20 w-20 font-extrabold bg-green-500 text-black text-center">
                  ৳{product.price}
                </p>

                <p className="text-lg  ml-20 mt-20 w-20    font-extralight bg-orange-500 text-black text-center line-through">
                  ৳{product.mprice}
                </p>
              </div>
              <div className="absolute flex bottom-8 left-0 w-full justify-center text-center   py-1 rounded-b">
                <h3 className="text-sm w-[97%] sm:font-extrabold font-bold bg-black text-white">  {product.name.length > 40 ? truncateText(product.name, 40) : product.sname}</h3>
              </div>
              
                </div>
             
                
           
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlides;
