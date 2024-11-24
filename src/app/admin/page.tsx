// pages/dashboard.js
import Dashboard from '@/components/admin/AdminPage';
import DashboardLayout from '@/components/admin/DashboardLayout';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard Unique Store Bd',
}
const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {/* Add dashboard content here */}
      <Dashboard />
    </DashboardLayout>
  );
};

export default AdminDashboard;
