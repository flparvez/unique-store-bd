"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import { useAddOrderMutation } from "@/store/services/CheckOutApi";

import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckoutPage = ({ user }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    transaction: "",
    paymentType: "full",
    ShippingType: "dhaka",
  });

  const payment = cart?.items[0]?.apayment 

  const dc = cart?.items?.[0]?.dc || false;

  // **Calculate Total Price Using useMemo to Prevent Unnecessary Re-renders**
  const cartTotal = useMemo(() => {
    return cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart.items]);

  const shippingCharge = useMemo(() => {
    return paymentDetails.ShippingType === "dhakao" ? 120 : paymentDetails.ShippingType === "dhaka" ? 60 : 0;
  }, [paymentDetails.ShippingType]);

  const totalAmount = useMemo(() => {
    return dc ? cartTotal : cartTotal + shippingCharge;
  }, [cartTotal, shippingCharge, dc]);

  // **Handle Input Changes**
  const handleCardInput = useCallback((e) => {
    setPaymentDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // **Handle Copy Click**
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("01608257876");
      setCopied(true);
      toast.success("Copied: 01608257876");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy number");
    }
  }, []);

  // **Handle Order Submission**
  const [addOrder] = useAddOrderMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const orderData = {
      user: user?.id,
      name: paymentDetails.cname,
      email: paymentDetails.email,
      phone: paymentDetails.phone,
      address: paymentDetails.address,
      city: paymentDetails.city,
      items: cart.items,
      total: totalAmount,
      transaction: paymentDetails.transaction,
      apayment: payment,
      paymentType: `${paymentDetails.paymentType} ${paymentDetails.ShippingType}`,
    };

    try {
      const response = await addOrder(orderData).unwrap();
      setOrderId(response._id);
      toast.success("Order placed successfully!");
      dispatch(clearCart());
    } catch (err) {
      toast.error("Failed to place the order");
    } finally {
      setIsProcessing(false);
    }
  };

  // **Redirect User After Order Placement**
  useEffect(() => {
    if (orderId) {
      router.push(`/profile/orders/${orderId}`);
    }
  }, [orderId, router]);

  // **Redirect if Cart is Empty**
  useEffect(() => {
    if (cart.items.length === 0) {
      router.push("/profile");
    }
  }, [cart.items.length, router]);

  return (
    <div>
    
    <form className="bg-white rounded-lg sm:mt-10 mt-4 shadow-md p-6" onSubmit={handleSubmit}>
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
                {
                  dc? <h2 className='block text-center font-bold sm:text-2xl text-xl text-gray-700'>Delivery Charge Free</h2>: <h2 className='block text-center font-bold sm:text-2xl text-xl text-gray-700'>Delivery Charge ৳120</h2>
                }
              
              </div>
            )}
            {paymentDetails.ShippingType === 'dhaka' && (
          <div className="">
          {
            dc? <h2 className='block text-center font-bold sm:text-2xl text-xl text-gray-700'>Delivery Charge Free</h2>: <h2 className='block text-center font-bold sm:text-2xl text-xl text-gray-700'>Delivery Charge ৳60</h2>
          }
        
        </div>
            )}
          </div>
        </div>
        <div className="py-2 flex justify-center">
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
            <label htmlFor="fullPayment" className="mr-4 sm:text-xl">Full Payment</label>
            <input
              type="radio"
              id="partialPayment"
              name="paymentType"
              value="partial"
              checked={paymentDetails.paymentType === 'partial'}
              onChange={handleCardInput}
              className="mr-2"
            />
            <label htmlFor="partialPayment " className='sm:text-xl '>Partial Payment</label>
          </div>
        </div>
           {paymentDetails.paymentType === 'full' && (
          <div className="my-2 flex justify-center">

            <h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'>Pay Full Payment ৳{totalAmount}</h2>
           
          </div>
        )}

             {paymentDetails.paymentType === 'partial' && (
          <div className="mb-4">
            
            <h2 className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700'> Pay ৳{payment} online & ৳{totalAmount - payment}  with Cash on Delivery</h2>
           
          </div>
        )}

        
<div className='block  text-center font-bold sm:text-2xl text-xl  text-gray-700 border'>Bkash(personal):  <button type="button" onClick={handleCopy}>01608257876</button> </div> 
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

    </div>
  );
};

export default CheckoutPage;
