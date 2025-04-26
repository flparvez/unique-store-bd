import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';
import OrderList from '@/components/admin/OrderList';
const Orders = () => {
  return (
  <DashboardLayout>

    <div>
      <h2>All Orders</h2>
      <OrderList />
    </div>
  </DashboardLayout>
  )
}

export default Orders
