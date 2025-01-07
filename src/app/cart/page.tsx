import React from 'react'
import CartPage from './CartPage'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Cart Page',
  description: 'Cart Page uniquestorebd',
}
const Cart = () => {
  return (
    <div>
      <CartPage />
    </div>
  )
}

export default Cart
