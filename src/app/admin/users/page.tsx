import React from 'react'
import DashboardLayout from '@/components/admin/DashboardLayout';

import AllUsers from '@/components/admin/AllUsers';
const Orders = () => {
  return (
  <DashboardLayout>

    <div>
      <h2>All Users</h2>
      <AllUsers />
    </div>
  </DashboardLayout>
  )
}

export default Orders
