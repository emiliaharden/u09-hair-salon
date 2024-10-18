import { useUserStore } from '@/store/useUserStore'
import { NavLink, useNavigate } from 'react-router-dom'

const AdminSidebar: React.FC = () => {
    const navigate = useNavigate()
    const clearUser = useUserStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/login')
    }

    return (
        <nav
            className="fixed left-0 top-0 w-64 h-screen bg-gray-800 text-white flex flex-col justify-between p-4"
            style={{ minHeight: '100vh' }} // säkerställer att sidobaren täcker hela höjden
        >
            <ul className="space-y-8">
                <li>
                    <NavLink to={'/admin/dashboard'} className="hover:text-gray-400">
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/users'} className="hover:text-gray-400">
                        Manage Users
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/services'} className="hover:text-gray-400">
                        Manage Services
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/settings'} className="hover:text-gray-400">
                        Settings
                    </NavLink>
                </li>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    )
}

export default AdminSidebar
