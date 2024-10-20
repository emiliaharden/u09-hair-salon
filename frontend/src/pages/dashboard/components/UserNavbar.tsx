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
        <nav className="w-64 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
            <ul className="space-y-4">
                <li>
                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                        }
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/bookings/user"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                        }
                    >
                        Kommande Bokningar
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/bookings"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                        }
                    >
                        Boka Tid
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/history"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                        }
                    >
                        Bokningshistorik
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/dashboard/profile"
                        className={({ isActive }) =>
                            isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                        }
                    >
                        Min Profil
                    </NavLink>
                </li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-red-600 font-semibold"
                    >
                        Logga Ut
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default UserNavbar
