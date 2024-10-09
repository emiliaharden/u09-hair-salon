import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/pages/admin/components/AdminSidebar';

const AdminDashboardPage = () => {
    

    return (
        <div>
            <AdminSidebar />
            <div className="ml-64 p-2">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
