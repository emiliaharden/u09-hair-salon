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
            className="fixed left-0 top-0 w-64 h-screen flex flex-col justify-between p-4"
            style={{ minHeight: '100vh' }} // säkerställer att sidobaren täcker hela höjden
        >
            <ul className="space-y-8">
                <li>
                    <NavLink to={'/admin/dashboard'}>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/schedules'}>View Schedules</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/schedules/create'}>Create schedule</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/users'}>Manage Users</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/services'}>Manage Services</NavLink>
                </li>
                <li>
                    <NavLink to={'/admin/dashboard/settings'}>Settings</NavLink>
                </li>
                <button onClick={handleLogout}>Logout</button>
            </ul>
        </nav>
    )
}

export default AdminSidebar
