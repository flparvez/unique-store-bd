// components/DashboardLayout.tsx
import { auth } from '@/auth';
import Sidebar from './Sidebar';
import { redirect } from 'next/navigation';
import AdminSearch from './AdminSearch';



const DashboardLayout = async ({ children }) => {

  const session = await auth()
const user = session?.user
const admin = user?.role==='admin'

if(!admin) redirect('/')

  return (
    <div className="flex mt-[70px]">
      <Sidebar />
      <AdminSearch />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
