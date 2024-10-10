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
        <header>
            {/* Login-knapp ovanför navbaren */}
            <div className="flex justify-end p-2 bg-gray-100">
                {!user ? (
                    <NavLink to="/login">
                        <button className="py-1 px-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            Login
                        </button>
                    </NavLink>
                ) : (
                    <NavLink to="/dashboard">
                        <button className="py-1 px-3 rounded border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                            {user.name}'s Dashboard
                        </button>
                    </NavLink>
                )}
            </div>

            <nav className="flex justify-center space-x-6 p-4 bg-gray-100">
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
                            Om oss
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/treatments"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Behandlingar
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Bokning
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? 'text-blue-600' : 'text-black'
                            }
                        >
                            Kontakt
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
