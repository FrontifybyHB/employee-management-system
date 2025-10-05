import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar heading={"Admin EMS"} />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 bg-gray-100 min-h-[calc(100vh-4rem)]">
          <div className="p-6">
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;