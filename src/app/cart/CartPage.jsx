"use client"
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, incrementItem, decrementItem, clearCart } from '../../store/cartSlice';
import Link from 'next/link';
import Image from 'next/image';

const CartPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleRemove = (product) => {
    dispatch(removeItem({ product }));
  };

  const handleIncrement = (product) => {
    dispatch(incrementItem({ product }));
  };

  const handleDecrement = (product) => {
    dispatch(decrementItem({ product }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="min-w-full py-2 align-middle inline-block">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cart?.items?.map((item) => (
                      <tr key={item.product}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Image width={300} height={300} className="h-10 w-10 rounded-full" src={item.image} alt={item.title} />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{item.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <button
                              className="text-gray-500 focus:outline-none focus:text-gray-600"
                              onClick={() => handleDecrement(item.product)}
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
                              </svg>
                            </button>
                            <span className="mx-2 text-gray-700">{item.quantity}</span>
                            <button
                              className="text-gray-500 focus:outline-none focus:text-gray-600"
                              onClick={() => handleIncrement(item.product)}
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">৳{(item.price * item.quantity).toFixed(2)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleRemove(item.product)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <Link href="/checkout" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Order Now
             
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
