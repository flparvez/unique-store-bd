"use client"
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaHome, FaUserAlt, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen p-3 mt-32 dark:bg-gray-900 dark:text-white bg-white text-black ${isOpen ? 'sm:w-64 w-48' : 'sm:w-20 w-10'} transition-width duration-300`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>Admin</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
          <FaBars />
        </button>
      </div>
      <div className="flex-1">
        <ul className="space-y-4">
          <li>
            <Link href="/admin">
              <h2 className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                <FaHome />
                <span className={`${!isOpen && 'hidden'}`}>Dashboard</span>
              </h2>
            </Link>
          </li>
          <li>
            <Link href="/admin/product/add-product">
              <h2 className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                <FaUserAlt />
                <span className={`${!isOpen && 'hidden'}`}>Add Product</span>
              </h2>
            </Link>
          </li>
           <li>
            <Link href="/admin/order">
              <h2 className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                <FaUserAlt />
                <span className={`${!isOpen && 'hidden'}`}>Orders</span>
              </h2>
            </Link>
          </li>
          <li>
            <Link href="/admin/category">
              <h2 className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700">
                <FaCog />
                <span className={`${!isOpen && 'hidden'}`}>Category</span>
              </h2>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
