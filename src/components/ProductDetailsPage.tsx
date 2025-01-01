"use client";
// import Loading from '@/components/Loading';
import { useDispatch } from 'react-redux';
import { YouTubeEmbed } from '@next/third-parties/google'

import { addItem } from '@/store/cartSlice';
import { useGetProductBySlugQuery } from '@/store/services/prodcutApi';
import Image from 'next/image';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LiveChatButton from '@/components/LiveChatButton';
import LatestProductList from '@/components/LatestProductList';
import Loading from './Loading';
import ProductImageSlider from './ProductImages';
import { useEffect } from 'react';

const ProductPage = ({ slug }: { slug: string }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data:product, isLoading } = useGetProductBySlugQuery(slug);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        product: product._id,
        slug: product.slug,
        title: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0].url,
      })
    );
    toast.success('Product added to cart');
    router.push('/cart');
  };
  if (isLoading) {
    return <Loading />
  }
  
  if (!product) {
    <h2>Product Not Found</h2>
  }else{
    return (
      <div className="container sm:mt-24 mt-[65px] mx-auto p-2">
        {/* Product Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="overflow-hidden justify-center ">
<ProductImageSlider images={product.images} /> 
            {/* only lg */}
            <div className='hidden lg:block'>
           {/* Latest Product Section */}
           <LatestProductList   />
            </div>
  
  
          </div>
    
  
          {/* Product Details */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Product Title */}
              <h1 className="sm:text-3xl text-xl font-bold mb-2">{product.name}</h1>
  
          <div className='flex gap-4 ml-4'>
    {/* Product Price */}
    <p className='text-xl text-black'><span className="text-xl sm:text-2xl text-[#ff3300] font-bold ">
    ৳{product.price} </span>
              </p>
        <p className='text-xl text-blackl '> <span className="text-xl  text-black line-through">
        ৳{product.mprice}
              </span></p>
  
          </div>
        
      <div className='flex gap-4 mt-2'>
    {/* Product Price */}
    {/* product stock lentgth */}

    <p className='text-lg text-green-600'>{product.stock > 0? "In Stock" : "Out of Stock"}</p>


 
  {product.stock > 0 ? (

<li className='font-bold'>
    <span>Only {product.stock} Left</span>

    </li>
  ) : (
    ""
  )}


     
          </div>
          <li className="font-bold text-black ml-[80px]">{product.warranty}
           </li>

              {/* Product Category */}
              <p className="flex flex-wrap gap-2 mb-2 mt-2">
                Category: <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md">
                <Link href={`/products/${product.category.slug}`}>
                    {product.category.name}
                  </Link>
                </span>
              </p>
  
              <h2 className="text-lg font-semibold mb-2">Product Description</h2>
  
              {/* Product Video (YouTube Embed) */}
              {product.video ? (
                <div className="mb-6">
                  {/* <h2 className="text-lg font-semibold mb-2">Product Video</h2> */}
                  <div className="aspect-w-16 aspect-h-9">
                  {/* className="w-full lg:h-80 md:h-96 h-56 rounded-md" */}
                  <YouTubeEmbed  videoid={product.video}  params="controls=0&color=red" />
                
                  </div>
                </div>
              ) : (
                ''
              )}
  
              {/* Product Description */}
              <div className="mb-6">
             
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
              <div className=' '>
{/* tags */}

<div className="flex flex-wrap gap-2 mb-2 mt-2">
  <li className="px-3 py-1 w-[99%] space-x-2 bg-blue-200 text-blue-800 rounded-md break-words">
    {product.seo}
  </li>
</div>
              </div>
              <div className='border border-gray-400 p-2'>
  <h5 className=" font-bold mb-2">What is the price of {product?.sname} in Bangladesh?</h5>
  <p className='font-medium'>The latest price of {product?.sname} is <b>৳{product?.price}</b> in Bangladesh. You can purchase the {product?.sname} in Bangladesh at the best price from our website or any of our stores.</p>
  </div>
            </div>

            {/* Sticky Add to Cart Button */} 
            <div className="sticky sm:bottom-0 bottom-16 sm:w-full w-[50%] flex   bg-white p-2 border-t text-right border-gray-400">

              <button
                onClick={handleAddToCart}
                className="w-full  py-2 sm:py-4 bg-orange-600  text-white rounded-md hover:bg-blue-700 transition duration-300"
              >
                Add to Cart
              </button>

  

            </div>
          </div>
        </div>
  
        {/* Live Chat Button */}
        <LiveChatButton />
  
          {/* only lg */}
          <div className='lg:hidden block'>
           {/* Latest Product Section */}
           <LatestProductList   />
            </div>
      </div>
    );
  }


};

export default ProductPage;