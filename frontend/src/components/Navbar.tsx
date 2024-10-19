import { useUserStore } from '@/store/useUserStore'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar: React.FC = () => {
    const user = useUserStore((state) => state.user)
    const location = useLocation()

    const isAdminRoute = location.pathname.startsWith('/admin')
    if (isAdminRoute) {
        return null
    }

    return (
        <header className="relative bg-gray-100">
            <div className="absolute top-4 right-4">
                {!user ? (
                    <NavLink to="/login">
                        <button className="py-2 px-4 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            Sign in
                        </button>
                    </NavLink>
                ) : (
                    <NavLink to="/dashboard">
                        <button className="py-2 px-4 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            {user.name}'s Dashboard
                        </button>
                    </NavLink>
                )}
            </div>

            <div className="flex justify-center py-4">
                <h1 className="text-3xl font-bold">Salong Saxen</h1>
            </div>

            <nav className="flex justify-center space-x-6 py-6 bg-gray-100">
                <ul className="flex space-x-32">
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Om Oss
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/treatments"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Priser
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Hitta till oss
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Boka tid
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
