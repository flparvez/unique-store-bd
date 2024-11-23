"use client";

import { useState} from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";



const Navbar = () => {
  const router = useRouter();
//   const [cartItemCount, setCartItemCount] = useState(0); 
  const [searchQuery, setSearchQuery] = useState(""); // Search bar query



  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page or handle search logic
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <header className="bg-white dark:bg-black shadow-md py-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4  md:px-8">
        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center w-full md:w-1/2 lg:w-1/3 order-2 md:order-1 mb-4 md:mb-0"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 w-full rounded-l-lg text-gray-800"
            placeholder="Search for products..."
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 18l6-6-6-6"
              /> 
            </svg>
          </button>
        </form>

  
        {/* Cart Icon */}
        <div className="w-full md:w-auto md:order-3 sm:flex hidden   justify-center md:justify-end items-center">
          <Link href="/cart" className="relative text-gray-800 dark:text-white hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18v18H3V3z"
              />
            </svg>
            {/* {cartItemCount > 0 && ( */}
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-1">
                {/* {cartItemCount} */} 4
              </span>
            {/* )} */}
          </Link>
        </div>
        
      </div>
            {/* Welcome Text */}
            <div className="w-full md:w-auto md:order-2 justify-center text-center text-gray-800 dark:text-white text-lg font-semibold">
          Welcome to Unique Store
        </div>

    </header>
  );
};

export default Navbar;
