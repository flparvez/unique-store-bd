"use client";
import Logo from "../../public/logo.webp";
import { useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

const Navbar = () => {
  // const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(""); // Search bar query

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search results page or handle search logic
    toast.error("Search Will Work Soon");
  };

  return (
    <header className="bg-white dark:bg-black shadow-md py-2 sm:py4">
    <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
      {/* Logo */}
      <div className="w-auto">
        <Link href="/">
          <h2 className="flex items-center">
            <Image src={Logo} alt="Logo" width={100} height={100} className="h-8 w-auto sm:h-10" />
          </h2>
        </Link>
      </div>

      {/* Home Button */}
      {/* <div className="w-auto">
        <Link href="/">
          <h2 className="flex items-center text-gray-800 dark:text-white hover:text-blue-600">
            Home
          </h2>
        </Link>
      </div> */}
      {/* Search Bar */}
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-[90%] sm:w-full md:w-[70%] lg:w-1/3 order-2 md:order-1 mb-2 md:mb-0"
      >
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="p-2 w-full rounded-l-lg text-gray-800"
          placeholder="Search for products..."
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-r-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18l6-6-6-6"
            />
          </svg>
        </button>
      </form>

    </div>

    {/* Welcome Text */}
    <div className="w-full md:w-auto justify-center text-center text-gray-800 dark:text-white text-lg font-semibold">
      Welcome to Unique Store
    </div>
  </header>
  );
};

export default Navbar;
