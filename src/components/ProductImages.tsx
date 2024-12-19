"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';


interface ProductImageSliderProps {
  images: {url:string}[];
}

const ProductImageSlider: React.FC<ProductImageSliderProps> = ({ images }) => {
  return (
    <div className="product-image-slider">
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
          
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image width={100} height={50} src={image.url} alt={`Product ${index + 1}`} className="w-full h-auto object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageSlider;
