import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/pages/admin/components/AdminSidebar';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const AdminDashboardPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex">
            {/* Mobilknapp för att öppna/stänga menyn */}
            <button
                onClick={toggleMenu}
                className="md:hidden bg-gray-800 text-white p-2 rounded-full fixed top-4 left-4 z-20 focus:outline-none"
            >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar för admin */}
            <div
                className={`fixed md:relative top-0 left-0 w-64 h-screen bg-gray-800 text-white p-4 transition-transform transform ${
                    isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0 z-10`}
            >
                <AdminSidebar />
            </div>

            {/* Innehållssektionen */}
            <div className="ml-0 md:ml-64 p-2 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
