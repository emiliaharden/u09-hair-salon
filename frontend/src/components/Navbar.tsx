import { useState } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const user = useUserStore((state) => state.user)
    const location = useLocation()

    const isAdminRoute = location.pathname.startsWith('/admin')
    if (isAdminRoute) {
        return null
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header className="relative">
            <div className="flex justify-center py-4">
                <h1 className="text-3xl font-bold">Lumi Locks</h1>
            </div>

            {/* Mobilnav */}
            <nav className="md:hidden flex justify-between items-center p-4">
                <button
                    onClick={toggleMenu}
                    className="focus:outline-none focus:ring-2"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobilmeny */}
            <nav
                className={`${
                    isMenuOpen ? 'block' : 'hidden'
                } md:flex md:justify-center space-y-4 md:space-y-0 md:space-x-6 py-6`}
            >
                <ul className="flex flex-col md:flex-row md:space-x-6 items-center">
                    <li>
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                isActive ? 'font-bold' : ''
                            }
                            onClick={closeMenu} // Stänger menyn efter att länken klickas
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? 'font-bold' : ''
                            }
                            onClick={closeMenu} // Stänger menyn efter att länken klickas
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/treatments"
                            className={({ isActive }) =>
                                isActive ? 'font-bold' : ''
                            }
                            onClick={closeMenu} // Stänger menyn efter att länken klickas
                        >
                            Treatments
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? 'font-bold' : ''
                            }
                            onClick={closeMenu} // Stänger menyn efter att länken klickas
                        >
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/bookings"
                            className={({ isActive }) =>
                                isActive ? 'font-bold' : ''
                            }
                            onClick={closeMenu} // Stänger menyn efter att länken klickas
                        >
                            Book now
                        </NavLink>
                    </li>
                    {!user ? (
                    <li className="block md:hidden">
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? 'font-bold' : ''
                            }
                            onClick={closeMenu} // Stänger menyn efter att länken klickas
                        >
                            Sign in
                        </NavLink>
                    </li>
                    ) : (
                        <li>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    isActive ? 'font-bold' : ''
                                }
                                onClick={closeMenu} // Stänger menyn efter att länken klickas
                            >
                                {user.name}'s Dashboard
                            </NavLink>
                        </li>
                    )}
                </ul>
            </nav>

            {/* "Sign in"-knappen i desktop-vy (borttagen från mobilvy) */}
            <div className="hidden md:block absolute top-4 right-4">
                {!user ? (
                    <NavLink to="/login">
                        <button className="py-2 px-4 rounded border focus:outline-none focus:ring-2 text-sm">
                            Sign in
                        </button>
                    </NavLink>
                ) : (
                    <NavLink to="/dashboard">
                        <button className="py-2 px-4 rounded border focus:outline-none focus:ring-2 text-sm">
                            {user.name}'s Dashboard
                        </button>
                    </NavLink>
                )}
            </div>
        </header>
    )
}

export default Navbar  
