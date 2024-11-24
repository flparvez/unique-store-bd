import OrderInformationPage from '@/components/OrderInformationPage'
import { Metadata } from 'next'

import React from 'react'
export const metadata: Metadata = {
  title: 'Order Details',
  description: 'Order Details- Unique Store Bd',
}
const OrderInfo = () => {
  return (
    <div>
      <OrderInformationPage />
    </div>
  )
}

export default OrderInfo
