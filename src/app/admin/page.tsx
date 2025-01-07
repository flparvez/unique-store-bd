// pages/dashboard.js

import DashboardLayout from '@/components/admin/DashboardLayout';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard uniquestorebd',
}

const DynamicAdminPage = dynamic(() => import('@/components/admin/AdminPage'), {
  loading: () => <p>Loading...</p>,

})
const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Add dashboard content here */}
      <DynamicAdminPage />
    </DashboardLayout>
  );
};

export default AdminDashboard;
