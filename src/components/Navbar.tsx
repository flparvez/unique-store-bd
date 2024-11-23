"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "../../public/logo.webp";
import Link from "next/link";
import {

  AiOutlineClose,
 
  AiOutlineFacebook,

} from "react-icons/ai";
import { CgMenuRightAlt } from "react-icons/cg";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className=" dark:text-white text-black w-full h-14 shadow-xl  bg-white  dark:bg-black ">
      <div className="flex justify-between items-center h-full  px-4 2xl:px-16">
        <div className="flex w-12 h-12">
          <Link href="/">
            <Image
              src={Logo}
              alt=""
              width={205}
              height={25}
              className="cursor-pointer"
              priority
            />
          </Link>
        </div>

        <div className="hidden sm:flex">
          <ul className="hidden sm:flex dark:text-white text-black">
            <Link href="/products">
              <li className="ml-10 border-red-500 uppercase hover:border-b text-xl">Products</li>
            </Link>

            <Link href="/">
              <li className="ml-10 border-red-500 uppercase hover:border-b text-xl">Unique</li>
            </Link>

       
            <Link href="/auth/login">
              <li className="ml-10 uppercase border-red-500 hover:border-b text-xl">Login</li>
            </Link>
            <Link href="/faqs">
              <li className="ml-10 uppercase border-red-500 hover:border-b text-xl">About</li>
            </Link>
          </ul>
        </div>
     <div className="flex ">
     <Link href="/profile">
              <h2 className="ml-10 uppercase hover:border-b border-red-500 text-xl">Profile</h2>
            </Link>
               
            
      <div className="">
      <Link href="/cart">
              <h2 className="ml-8 uppercase hover:border-b text-xl">Cart</h2>
            </Link>
      </div>
     </div>
        <div className="sm:hidden  dark:text-white text-black cursor-pointer pl-24">
          {menuOpen ? (
            <AiOutlineClose onClick={handleNav} size={30} />
          ) : (
            <CgMenuRightAlt onClick={handleNav} size={30} />
          )}
        </div>
      </div>

      <div
        className={
          menuOpen
            ? "fixed left-0 top-0 w-[30%]  sm:hidden h-screen bg-white dark:bg-[#000000] p-10 case-in duration-600"
            : "fixed left-[-100%] top-0 p-10 case-in duration-600"
        }
      >
        <div className="flex w-full items-center justify-center"></div>

        <div className="flex-col py-4 bg-white dark:text-white text-black dark:bg-[#000000]">
          <ul>
            <Link href="/products">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Products
              </li>
            </Link>

        

            <Link href="/auth/login">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Login
              </li>
            </Link>
            <Link href="/faqs">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Faqs
              </li>
            </Link>

            <Link href="/auth/register">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Register
              </li>
            </Link>
          </ul>
        </div>
        <Image
          src={Logo}
          alt=""
          width={50}
          height={25}
          className="cursor-pointer"
          priority
        />
        <div className="flex flex-row justify-around pt-10 items-center">
  
          <AiOutlineFacebook size={30} className="cursor-pointer" />
      
        </div>
      
      </div>
    </nav>
  );
}

export default Navbar;