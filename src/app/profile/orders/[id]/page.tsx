
import OrderInformationPage from '@/components/OrderInformationPage'

import { Metadata } from 'next'

import React from 'react'
export const metadata: Metadata = {
  title: 'Order Details',
  description: 'Order Details- uniquestorebd',
}
const OrderInfo =async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id

  return (
    <div>
      <OrderInformationPage id={id} />
    </div>
  )
}

export default OrderInfo
