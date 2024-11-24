
import CheckoutPage from '@/components/CheckoutPage'
import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Order Page',
  description: 'Order Page Unique Store Bd',
}
const Checkout = () => {
  return (
    <div>
      <CheckoutPage />
    </div>
  )
}

export default Checkout
