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
          350: { slidesPerView: 2 },
          450: { slidesPerView: 3 },
          550: { slidesPerView: 4 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products?.map((product) => (
          <SwiperSlide key={product._id}>
            <Link href={`/product/${product.slug}`}>
              <div className="w-[182px]  hover:scale-95 sm:w-[70%] md:w-[250px]  mx-auto my-2">
                <div className="overflow-hidden text-center">
                  <Image
                    width={220}
                    height={220}
                    src={product.images[0].url}
                    alt={product.name}
                    className="object-cover w-full sm:h-[190px] h-[180px]"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm sm:text-xl font-bold text-black ">
                  {product.name.length > 40 ? truncateText(product.name, 40) : product.sname}
                  
                </h3>
                <p className="text-blue-700 font-bold text-center">
                  {product?.category?.name}
                </p>
                <p className="text-lg font-extrabold text-center">
                  ৳{product.price}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlides;
