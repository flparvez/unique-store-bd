"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useFetchProductsFromSearchQueryQuery } from "@/store/services/prodcutApi";

const AdminSearch = () => {
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



  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-black   sm:py-2 z-50">
      <div className="container mx-auto flex items-center justify-between px-2 md:px-8">
    
<h2 className="font-bold"><Link  href='/'>Home</Link></h2>
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
                      <Link href={`/admin/product/edit-product/${product._id}`} onClick={handleProductClick}>
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

    
      </div>

  
    </header>
  );
};

export default AdminSearch;
