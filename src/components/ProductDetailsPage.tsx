"use client";

import { useDispatch } from 'react-redux';
import { YouTubeEmbed } from '@next/third-parties/google';
import { addItem } from '@/store/cartSlice';
import { useGetProductBySlugQuery } from '@/store/services/prodcutApi';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LiveChatButton from '@/components/LiveChatButton';
import LatestProductList from '@/components/LatestProductList';
import Loading from './Loading';
import ProductImageSlider from './ProductImages';
import { useEffect } from 'react';

const ProductPage = ({ slug }: { slug: string }) => {
  const { data: product, isLoading } = useGetProductBySlugQuery(slug);
  const router = useRouter();
  const dispatch = useDispatch();

  const payment = product?.advanced || 100;
  const deliveryCharge = product?.advanced === 200;

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(
      addItem({
        product: product._id,
        slug: product.slug,
        title: product.name,
        price: product.price,
        advanced: product.advanced,
        apayment: payment,
        dc: deliveryCharge,
        quantity: 1,
        image: product.images?.[0]?.url || '/default-image.jpg',
      })
    );

    router.push('/checkout');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        <p className="text-gray-600 mt-2">
          The product you're looking for doesn't exist or is no longer available.
        </p>
        <Link 
          href="/products" 
          className="text-blue-600 hover:underline mt-4 inline-block"
          aria-label="Browse all products"
        >
          Browse our products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Breadcrumb Navigation */}
     
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image Section */}
        <div className="overflow-hidden justify-center">
          <ProductImageSlider images={product.images} />
          
          {/* Latest Products (Desktop) */}
          <div className="hidden lg:block mt-8">
            <h2 className="text-xl font-bold mb-4">Related Products</h2>
            <LatestProductList />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              {product.name}
              {product.sname && (
                <span className="block text-lg text-green-700 mt-1">
                  Model: {product.sname}
                </span>
              )}
            </h1>

            {/* Price Section */}
            <div className="flex items-center gap-4 mb-3">
              <span className="text-2xl font-bold text-[#ff3300]">
                ৳{product.price}
              </span>
              {product.mprice && (
                <span className="text-lg text-gray-500 line-through">
                  ৳{product.mprice}
                </span>
              )}
            </div>

            {/* Stock & Warranty Info */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? (
                  <>
                    <span className="font-bold">In Stock</span>
                    {product.stock < 10 && (
                      <span className="ml-2">(Only {product.stock} left)</span>
                    )}
                  </>
                ) : 'Out of Stock'}
              </span>
              {product.warranty && (
                <span className="font-bold text-black">{product.warranty}</span>
              )}
            </div>

            {/* Payment Info */}
            <div className="mb-4">
              <p className="text-red-600 font-bold">
                {payment} Taka or full payment in advance is required
              </p>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="text-gray-600">Category: </span>
              <Link 
                href={`/products/${product.category.slug}`}
                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition"
              >
                {product.category.name}
              </Link>
            </div>

            {/* Product Video */}
            {product.video && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Product Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                  <YouTubeEmbed 
                    videoid={product.video} 
                    params="controls=1&color=red&rel=0" 
                  />
                </div>
              </div>
            )}

            {/* Product Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Product Details</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {/* SEO Keywords */}
            {product.seo && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Product Tags</h2>
                <div className="flex flex-wrap gap-2">
             
                    <span 
                      
                      className="px-3 py-1 w-full space-x-2 bg-blue-200 text-blue-800 rounded-md break-words"
                    >
                      {product.seo.trim()}
                    </span>
             
                </div>
              </div>
            )}

            {/* SEO-Friendly FAQ Section */}
            <div className="border border-gray-200 rounded-lg p-4 mb-6">
              <h2 className="text-xl font-bold mb-3">Frequently Asked Questions</h2>
              
              <div className="space-y-4">


         
                <div>
                <h3 className="font-semibold"> What is the price of {product?.sname} in Bangladesh?</h3>
                  <p className="text-gray-700">
                  The latest price of <b>{product?.sname}</b> is{' '}
                <strong>৳{product?.price}</strong> in Bangladesh. You can purchase the{' '}
                {product?.sname} in Bangladesh at the best price from our website or any
                of our stores.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">Where can I buy {product.name} in Bangladesh?</h3>
                  <p className="text-gray-700">
                    You can purchase {product.name} from our store with nationwide delivery across Bangladesh. 
                    We offer secure online payment options including cash on delivery.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-semibold">What is the warranty for {product.name}?</h3>
                  <p className="text-gray-700">
                    {product.warranty || "This product comes with a standard manufacturer's warranty."}
                  </p>
                </div>
              </div>
            </div>
          </div>



      
          {/* Order Button */}
          <div className="sticky sm:bottom-0 bottom-16 sm:w-full w-[50%] flex bg-white p-2 border-t text-right border-gray-400">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 sm:py-4 bg-orange-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
              aria-label={`Order ${product.name} now`}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? 'Order Now' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>

      {/* Live Chat */}
      <LiveChatButton />

      {/* Latest Products (Mobile) */}
      <div className="lg:hidden mt-8">
        <h2 className="text-xl font-bold mb-4">You May Also Like</h2>
        <LatestProductList />
      </div>
    </div>
  );
};

export default ProductPage;