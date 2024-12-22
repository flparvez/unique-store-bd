"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '@/store/cartSlice';
import { useAddOrderMutation } from '@/store/services/CheckOutApi';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

const CheckoutPage = ({ user }) => {

  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [addOrder] = useAddOrderMutation();

  const [paymentDetails, setPaymentDetails] = useState({
    cname: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    transaction: '',
    paymentType: 'full',
    ShippingType: 'dhaka'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleCardInput = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value
    });
  };

  const dhakaO = paymentDetails.ShippingType === 'dhakao' ? 120 : 0;
  const dhaka = paymentDetails.ShippingType === 'dhaka' ? 60 : 0;

  const cartTotal = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalAmount = dhaka ? cartTotal + dhaka : dhakaO ? cartTotal + dhakaO : cartTotal;

  const ndata = {
    user: user?.id,
    name: paymentDetails.cname,
    email: paymentDetails.email,
    phone: paymentDetails.phone,
    address: paymentDetails.address,
    city: paymentDetails.city,
    items: cart.items,
    total: totalAmount,
    transaction: paymentDetails.transaction,
    paymentType: paymentDetails.paymentType+" "+paymentDetails.ShippingType
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const response= await addOrder(ndata).unwrap();
      setOrderId(response.orderId); // Set the orderId from the response

      toast.success('Order placed successfully!');
     
      dispatch(clearCart());
    } catch (err) {
      toast.error('Failed to place the order');
      console.error('Failed to save the order: ', err);
    } finally {
      setIsProcessing(false);
    }
  };

 

  return (
<div>
      <form className="bg-white rounded-lg sm:mt-20 mt-14 shadow-md p-6" onSubmit={handleSubmit}>
        <h2 className='text-xl sm:text-2xl font-bold text-center'>অর্ডারটি কনফার্ম করতে ফর্মটি সম্পুর্ণ পুরণ করে নিচের Place Order বাটনে ক্লিক করুন।</h2>
        <div className="mb-4">
          <label htmlFor="CustomerName" className="block text-sm font-medium text-gray-700">আপনার নাম <span className='text-red-600'>*</span></label>
          <input
            type="text"
            id="CustomerName"
            name="cname"
            value={paymentDetails.cname}
            onChange={handleCardInput}
            placeholder="আপনার নাম লিখুন"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">মোবাইল নাম্বার <span className='text-red-600'>*</span></label>
          <input
            type="number"
            id="phone"
            name="phone"
            value={paymentDetails.phone}
            onChange={handleCardInput}
            placeholder="মোবাইল নাম্বার "
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">সম্পূর্ণ ঠিকানা <span className='text-red-600'>*</span></label>
          <input
            type="text"
            id="address"
            name="address"
            value={paymentDetails.address}
            onChange={handleCardInput}
            placeholder="সম্পূর্ণ ঠিকানা"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City <span className='text-red-600'>*</span></label>
          <input
            type="text"
            id="city"
            name="city"
            value={paymentDetails.city}
            onChange={handleCardInput}
            placeholder="জেলা"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-3 mb-4 text-center">items</h2>
          <div className="flex flex-col">
            {cart.items.map((item) => (
              <div key={item.product} className="flex items-center justify-center mb-4">
                <Image width={100} height={100} src={item.image} alt={item.title} className="w-18 h-18 mr-4" />
                <div>
                  <h3 className="text-sm sm:text-xl font-medium">{item.title}</h3>
                  <p className="text-black text-sm">
                    {item.quantity} x ৳{item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="mb-4 flex justify-center">
              <label className="block text-xl font-bold py-2 px-4 text-gray-700">Shipping <span className='text-red-600'>*</span></label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dhaka"
                  name="ShippingType"
                  value="dhaka"
                  checked={paymentDetails.ShippingType === 'dhaka'}
                  onChange={handleCardInput}
                  className="mr-2 px-4 py-2 border rounded-md bg-gray-200 "
                />
                <label htmlFor="dhaka">ঢাকার ভেতরে</label>
                <input
                  type="radio"
                  id="dhakao"
                  name="ShippingType"
                  value="dhakao"
                  checked={paymentDetails.ShippingType === 'dhakao'}
                  onChange={handleCardInput}
                  className="ml-4 mr-2 px-4 py-2 border rounded-md bg-gray-200 "
                />
                <label htmlFor="dhakao">ঢাকার বাহিরে</label>
              </div>
            </div>
            {paymentDetails.ShippingType === 'dhakao' && (
              <div className="">
                <h2 className='block text-center font-bold sm:text-2xl text-xl text-gray-700'>Delivery Charge ৳120</h2>
              </div>
            )}
            {paymentDetails.ShippingType === 'dhaka' && (
              <div className="">
                <h2 className='block text-center font-bold sm:text-2xl text-xl text-gray-700'>Delivery Charge ৳60</h2>
              </div>
            )}
          </div>
        </div>
        <div className="py-2">
          <label className="block text-xl mb-3 font-bold text-gray-700">Payment Type <span className='text-red-600'>*</span></label>
          <div className="flex items-center">
            <input
              type="radio"
              id="fullPayment"
              name="paymentType"
              value="full"
              checked={paymentDetails.paymentType === 'full'}
              onChange={handleCardInput}
              className="mr-2"
            />
            <label htmlFor="fullPayment" className="mr-4">Full Payment</label>
            <input
              type="radio"
              id="partialPayment"
              name="paymentType"
              value="partial"
              checked={paymentDetails.paymentType === 'partial'}
              onChange={handleCardInput}
              className="mr-2"
            />
            <label htmlFor="partialPayment">Partial Payment</label>
          </div>
        </div>
           {paymentDetails.paymentType === 'full' && (
          <div className="my-2">

            <h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'>Pay Full Payment ৳{dhaka? ndata.total: dhakaO && ndata.total}</h2>
           
          </div>
        )}

             {paymentDetails.paymentType === 'partial' && (
          <div className="mb-4">
            
            <h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'> Pay ৳100 online & ৳{dhaka? ndata.total -100: dhakaO && ndata.total -100}  with Cash on Delivery</h2>
           
          </div>
        )}

        
<h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700 border'>Bkash(personal): 01608257876</h2>
<br />
        {/* Transaction ID */}
        <div className="mb-4">
          <label htmlFor="transaction" className="block text-sm font-medium text-gray-700">Last 4 Digits of Transaction<span className='text-red-600'>*</span></label>
          <input
            type="text"
            id="transaction"
            name="transaction"
            value={paymentDetails.transaction}
            onChange={handleCardInput}
            placeholder="7876"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
     
    
        <div className='flex flex-col'>
          <h2 className='text-center font-bold sm:text-2xl text-xl'> Total: ৳{totalAmount.toFixed(2)}</h2>
          <button
            type="submit"
            className="w-full bg-[#20b4ab] hover:bg-[#2d948d] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isProcessing}
          >
            {isProcessing ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </form>

        {/* Responsive Success Message with Order ID */}
        {orderId && (
        <div className="mt-8 p-4 bg-green-100 text-green-800 rounded-md shadow-md text-center">
          <h3 className="text-lg font-semibold">অর্ডারটি সফলভাবে সম্পন্ন হয়েছে!</h3>
          <p className="mt-2">আপনার অর্ডার আইডি: <span className="font-bold">{orderId}</span></p>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
