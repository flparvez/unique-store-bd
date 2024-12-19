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
          350: { slidesPerView: 2 }, // For small screens
          580: { slidesPerView: 3 }, // For small screens
          768: { slidesPerView: 4 }, // For tablets
          1024: { slidesPerView: 4 }, // For desktops
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {products && products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="w-[182px] h-[294px]  sm:w-[280px] md:w-[250px] sm:h-[290px] mx-auto my-2">
              <Link href={`/product/${product.slug}`}>
                <div className="overflow-hidden justify-center text-center">
                  <Image
                    width={220}
                    height={220}
                    src={product.images[0].url}
                    alt={product.name}
                    className="object-cover w-auto h-auto  text-center"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-sm block text-black sm:text-xl  font-bold ">{product.name.length > 30 ?  truncateText(product?.name, 30)+"..." : product.name} </h3>
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
