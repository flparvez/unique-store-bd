"use client";
import Logo from "../../public/logo.webp";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useFetchProductsFromSearchQueryQuery } from "@/store/services/prodcutApi";

const Navbar = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const { data: products, error, isLoading } = useFetchProductsFromSearchQueryQuery(query, {
    skip: query === '', // Skip fetching when query is empty
  });

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowResults(true);
  };

  const handleProductClick = () => {
    setQuery('');
    setShowResults(false);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowResults(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const cart = useSelector((state) => state.cart);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-black shadow-md  sm:py-2 z-50">
      <div className="container mx-auto flex items-center justify-between px-2 md:px-8">
        {/* Logo */}
        <div className="w-auto">
          <Link href="/">
            <h2 className="flex items-center">
              <Image src={Logo} alt="Logo" width={100} height={100} className="h-8 w-auto sm:h-10" />
            </h2>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 mx-4" ref={searchRef}>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for products..."
            className="border p-2 w-full rounded-lg text-gray-800"
          />
          {showResults && (
            <div className="absolute left-0 right-0 bg-white shadow-md  rounded-lg z-10">
              {isLoading && <p className="p-2">Loading...</p>}
              {error && <p className="p-2">Error: {error.message}</p>}
              <ul className="max-h-72 overflow-y-auto">
                {products?.length > 0 ? (
                  products?.slice(0, 20).map((product) => (
                    <li key={product._id} className="border-b last:border-0">
                      <Link href={`/product/${product.slug}`} onClick={handleProductClick}>
                        <div className="flex items-center p-2">
                          <Image width={80} height={80} src={product.images[0].url} alt={product.name} className="sm:w-14 w-12 h-12 object-cover rounded-lg mr-4" />
                          <div>
                            <p className="text-gray-800 font-bold">৳{product.price}</p>
                            <h3 className="text-gray-700 text-sm font-bold">{product.name}</h3>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  <p className="p-2">No Product Found</p>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Cart Icon with Item Count */}
        <Link href="/cart" className="hidden sm:flex flex-col items-center relative text-gray-800 dark:text-white hover:text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 mb-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h18v18H3V3z"
            />
          </svg>
          Cart
          <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full px-1">
            {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        </Link>
      </div>

      {/* Welcome Text */}
      <div className="w-full text-center text-gray-800 dark:text-white sm:text-[17px] text-[13px] font-bold ">
        <marquee >আসসালামু আলাইকুম সম্মানিত সদস্য আপনাকে অভিনন্দন ওয়েবসাইটে প্রবেশ করার
          জন্য। আমাদের কাছে পেয়ে যাবেন টেকসই নিত্য প্রয়োজনীয় ইলেকট্রনিক
          মালামাল। আপনার পছন্দের প্রোডাক্ট এড কার্ড করে এখনই অর্ডার করুন।</marquee>
      </div>
    </header>
  );
};

export default Navbar;
