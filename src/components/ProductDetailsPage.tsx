"use client";
// import Loading from '@/components/Loading';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cartSlice';
import { useGetProductBySlugQuery } from '@/store/services/prodcutApi';
import Image from 'next/image';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LiveChatButton from '@/components/LiveChatButton';
import LatestProductList from '@/components/LatestProductList';
import Loading from './Loading';

const ProductPage = ({ slug }: { slug: string }) => {
  
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
        image: product.images,
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
          <Image
  width={500}
  height={250}
  src={product.images}
  alt="Product Image"
  className="object-cover rounded-md"
  loading="lazy"
/>

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
              <h1 className="sm:text-3xl text-xl font-bold mb-4">{product.name}</h1>
  
          <div className='flex gap-8'>
    {/* Product Price */}
    <p className='text-xl text-black'>    Price: ৳<span className="text-xl sm:text-2xl text-[#f30] font-semibold ">
             {product.price} </span>
              </p>
        <p className='text-xl text-blackl '> Market Price:   ৳<span className="text-xl  text-[#f30] line-through">
          {product.mprice}
              </span></p>
  
          </div>
          <br />
      <div className='flex gap-8'>
    {/* Product Price */}
    <p className="text-xl text-green-600 mb-2">stock:{product.stock}</p>
  
        <p className="font-bold text-black"> * 
            ({product.warrenty})
           </p>
  
          </div>


              {/* Product Stock */}
             
              {/* Product Category */}
              <p className="flex flex-wrap gap-2 mb-6">
                Category: <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md">
                <Link href={`/products/${product.category.slug}`}>
                    {product.category.name}
                  </Link>
                </span>
              </p>
  
              {/* Product Tags */}
              {/* <div className="flex flex-wrap gap-2 mb-6">
                <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md">
                  {product.tags}
                </span>
           
              </div> */}
  
              {/* Product Video (YouTube Embed) */}
              {product.video ? (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Product Video</h2>
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full lg:h-80 md:h-96 h-56 rounded-md"
                      src={`https://www.youtube.com/embed/${product.video}?controls=0&showinfo=0&modestbranding=1&rel=0&autohide=1&autoplay=1`}
                      title="Product Video"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      frameBorder="0"
                    ></iframe>
                  </div>
                </div>
              ) : (
                ''
              )}
  
              {/* Product Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Product Description</h2>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
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