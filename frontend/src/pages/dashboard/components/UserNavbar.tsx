import { useUserStore } from '@/store/useUserStore'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, Calendar, User, LogOut, Scissors } from 'lucide-react'

const UserNavbar = () => {
    const navigate = useNavigate()
    const clearUser = useUserStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        clearUser()
        navigate('/login')
    }

    return (
        <>
            {/* Navbar for desktop version */}
            <nav className="hidden sm:block w-64 p-6 border rounded-lg shadow-md">
                <ul className="space-y-4">
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings/user">Upcoming Bookings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings">Book Appointment</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/profile">My Profile</NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout}>Log Out</button>
                    </li>
                </ul>
            </nav>

            {/* Navbar for mobile version with icons from lucide-react */}
            <nav className="sm:hidden fixed bottom-0 left-0 right-0 border-t shadow-md flex justify-around p-2">
                <NavLink to="/dashboard">
                    <Home size={24} />
                </NavLink>
                <NavLink to="/dashboard/bookings/user">
                    <Calendar size={24} />
                </NavLink>
                <NavLink to="/dashboard/bookings">
                    <Scissors size={24} />
                </NavLink>
                <NavLink to="/dashboard/profile">
                    <User size={24} />
                </NavLink>
                <button onClick={handleLogout}>
                    <LogOut size={24} />
                </button>
            </nav>
        </>
    )
}

export default UserNavbar
