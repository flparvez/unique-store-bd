import DashboardLayout from '@/components/admin/DashboardLayout'
import OrderInfoPage from '@/components/admin/OrderInfoPage'
import React from 'react'

const OrderInfo = async ({
  params,
}: {
  params: Promise<{ id: string }>
}) => {
  const id = (await params).id

  return (
  <DashboardLayout>
 <h1 className="text-2xl font-bold">Order Details </h1>
    <div>
     <OrderInfoPage id={id} />
    </div>
  </DashboardLayout>
  )
}

export default OrderInfo
