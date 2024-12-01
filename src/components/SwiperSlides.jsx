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

  if (!mounted) return null;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "";
    }
  }
  
  return (
    <div className="swiper-container">
      
      <Swiper
       
        parallax={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          0: { slidesPerView: 1 }, // For very small screens
          360: { slidesPerView: 2 }, // For small screens
          580: { slidesPerView: 3 }, // For small screens
          768: { slidesPerView: 4 }, // For tablets
          1024: { slidesPerView: 4 }, // For desktops
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products && products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="w-[180px] h-[360px] sm:w-[250px] sm:h-[350px] mx-auto my-2">
              <Link href={`/product/${product.slug}`}>
                <div className="overflow-hidden">
                  <Image
                    width={220}
                    height={200}
                    src={product.images}
                    alt={product.name}
                    className="object-cover rounded-t-lg"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm font-extrabold text-center">{truncateText(product.name, 38)}..</h3>
                <p className="text-blue-700 font-bold text-center">{product.category.name}</p>
                <p className="text-lg font-extrabold text-center">৳{product.price}</p>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperSlides;
