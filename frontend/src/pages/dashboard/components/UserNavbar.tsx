import { useUserStore } from '@/store/useUserStore'
import { NavLink, useNavigate } from 'react-router-dom'

const UserNavbar = () => {
    const navigate = useNavigate()
    const clearUser = useUserStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/login')
    }

    return (
        <nav className="flex flex-col w-64 h-full p-4 bg-gray-800 text-white">
            <ul className="space-y-4">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) => (isActive ? 'text-blue-400' : 'text-white')}
                >
                    Dashboard
                </NavLink>
                <li>
                    <NavLink
                        to="/dashboard/bookings/user"
                        className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}
                    >
                        Kommande Bokningar
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/bookings"
                        className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}
                    >
                        Boka Tid
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/history"
                        className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}
                    >
                        Bokningshistorik
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) => (isActive ? 'text-blue-500' : 'text-white')}
                    >
                        Min Profil
                    </NavLink>
                </li>
                <li>
                    <button onClick={handleLogout} className="text-white hover:text-red-500">
                        Logga Ut
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default UserNavbar