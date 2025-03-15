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

  const payment = product?.advanced || 100

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
    return <h2 className="text-center text-2xl font-bold text-red-500">Product Not Found</h2>;
  }

  return (
    <div className="container  mx-auto p-2">
      {/* Product Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="overflow-hidden justify-center">
          <ProductImageSlider images={product.images} />
          {/* Latest Products (Only on lg screens) */}
          <div className="hidden lg:block">
            <LatestProductList />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="sm:text-3xl text-xl font-bold mb-2">{product.name}</h1>

            {/* Price Section */}
            <div className="flex gap-4 ml-4">
              <p className="text-xl text-black">
                <span className="text-xl sm:text-2xl text-[#ff3300] font-bold">৳{product.price}</span>
              </p>
              {product.mprice && (
                <p className="text-xl text-black">
                  <span className="text-xl text-black line-through">৳{product.mprice}</span>
                </p>
              )}
            </div>

            {/* Stock & Warranty Info */}
            <div className="flex gap-4 mt-2">
              <p className={`text-lg ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
              {product.stock > 0 && (
                <span className="font-bold">Only {product.stock} Left</span>
              )}
            </div>
            {product.warranty && (
              <p className="font-bold text-black ml-[80px]">{product.warranty}</p>
            )}

            {/* Advance Payment Info */}
            <div>
              <h2 className="text-red-600 font-bold">
                {product.advanced ? product.advanced : 100} Taka or full payment in advance is required
              </h2>
            </div>

            {/* Category */}
            <p className="flex flex-wrap gap-2 mb-2 mt-2">
              Category:{' '}
              <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-md">
                <Link href={`/products/${product.category.slug}`}>
                  {product.category.name}
                </Link>
              </span>
            </p>

            {/* Product Video (YouTube Embed) */}
            {product.video && (
              <div className="mb-6">
                <div className="aspect-w-16 aspect-h-9">
                  <YouTubeEmbed videoid={product.video} params="controls=1&color=red" />
                </div>
              </div>
            )}

            {/* Product Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Product Description</h2>
              <div
                className="prose"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            {/* SEO Tags */}
            {product.seo && (
              <div className="flex flex-wrap gap-2 mb-2 mt-2">
                <span className="px-3 py-1 w-full space-x-2 bg-blue-200 text-blue-800 rounded-md break-words">
                  {product.seo}
                </span>
              </div>
            )}

            {/* Pricing Info for SEO */}
            <div className="border border-gray-400 p-2">
              <h5 className="font-bold mb-2">
                What is the price of {product?.sname} in Bangladesh?
              </h5>
              <p className="font-medium">
                The latest price of <b>{product?.sname}</b> is{' '}
                <b>৳{product?.price}</b> in Bangladesh. You can purchase the{' '}
                {product?.sname} in Bangladesh at the best price from our website or any
                of our stores.
              </p>
            </div>
          </div>

          {/* Sticky Add to Cart Button */}
          <div className="sticky sm:bottom-0 bottom-16 sm:w-full w-[50%] flex bg-white p-2 border-t text-right border-gray-400">
            <button
              onClick={handleAddToCart}
              className="w-full py-2 sm:py-4 bg-orange-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Live Chat Button */}
      <LiveChatButton />

      {/* Latest Product Section (Hidden on lg) */}
      <div className="lg:hidden block">
        <LatestProductList />
      </div>
    </div>
  );
};

export default ProductPage;
