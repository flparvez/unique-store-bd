"use client"
import { Marquee } from "@devnomic/marquee";
// if you copy ala shadcn, no need import css.
import "@devnomic/marquee/dist/index.css";
import dynamic from 'next/dynamic'
import Loading from './Loading'
import { Button } from './ui/button'
import { useEffect } from 'react'
import Link from 'next/link'
const DynamicTopProductSlider = dynamic(() => import('./TopProductSLider'), {
  loading: () =><Loading />,
  ssr: false
})
const DynamicLatestProductSlider = dynamic(() => import('./LatestProduct'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const DynamicCategorySlider = dynamic(() => import('./CategorySlider'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})

const DynamicTopSellingProduct = dynamic(() => import('./TopSellingProduct'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})



const HomePage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='mt-[40px] sm:mt-[52px]'>
         <div className="w-full text-center text-gray-800 dark:text-white sm:text-[17px] text-[13px] font-bold ">
        <Marquee className="text-red-500" >Unique Store Bd | আসসালামু আলাইকুম সম্মানিত সদস্য আপনাকে অভিনন্দন ওয়েবসাইটে প্রবেশ করার
          জন্য। আমাদের কাছে পেয়ে যাবেন টেকসই নিত্য প্রয়োজনীয় ইলেকট্রনিক
          মালামাল। আপনার পছন্দের প্রোডাক্ট এড কার্ড করে এখনই অর্ডার করুন।</Marquee>
      </div>
      {/* Slider */}
      <DynamicTopProductSlider />

      {/* Special Product Bannar/ Product */}
      <div className='justify-center text-center'>
<Button variant={'secondary'} className='mb-2 '>Category</Button>
</div>
<DynamicCategorySlider />

{/* Latest Product 16 Product With Pagination */}
<div className='flex justify-center'>
       <Button >Latest Product</Button>
  
    </div>
<DynamicLatestProductSlider   />

{/* Top Selling Product */}

<DynamicTopSellingProduct />


<div className="max-w-7xl mx-auto p-2">
    
    <p className="mb-2">
      <span className="font-semibold text-yellow-500">Unique Store BD</span> - The Most Reliable eCommerce Site in Bangladesh. We maintain a comprehensive stock to ensure you receive your orders as quickly as possible. Experience online shopping in Bangladesh for authentic products, including the latest tech gadgets such as live streaming gear, YouTube studio setups, vlogging gear, home studio equipment, webcams, microphones, lighting setups, ring lights, smartphones, gimbals, and related products.
    </p>
    <p className="mb-4">
      Enjoy the convenience of home delivery or courier service, or pick up your orders from our pickup point. We guarantee product quality, fast delivery, and exceptional after-sales support. Benefit from our free pre-sales and post-sales consultations to find the best budget-friendly gear.
    </p>
    <p className="mb-4">
      Our technical team is dedicated to providing a seamless online shopping experience in Bangladesh, offering world-class, original products at reasonable prices. Our customer care team is always ready to assist you with your purchases and provide technical support.
    </p>
    <p className="mb-4">
      With over one year of experience, we have earned the trust of millions of customers through authentic products and quality after-sales support, making us the most reliable and trusted platform in the Bangladesh eCommerce industry.
    </p>
    <p className="mb-4">
      Join our vibrant online community to share your shopping experiences, learn about new products, and get answers to your questions. We are highly active on social media, especially in our Facebook Page:<Link href="https://www.facebook.com/uniquestorebd23" passHref><span className="font-semibold text-yellow-500">Unique Store BD</span></Link>, where we engage with customers to improve our services.
    </p>
    <p className="mb-4">
      Whether you need live streaming equipment, YouTube studio gear, or other home studio equipment, <span className="font-semibold text-yellow-500">Unique Store BD</span> is your go-to recommendation. Help your friends by recommending us, and we'll provide friendly and professional assistance.
    </p>
  </div>
    </div>
  )
}

export default HomePage
