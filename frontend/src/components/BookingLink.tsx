import { NavLink, useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'

const BookingLink: React.FC = () => {
    const user = useUserStore((state) => state.user)
    const navigate = useNavigate()

    const handleClick = () => {
        if (user) {
            navigate('/dashboard/bookings')
        } else {
            navigate('/login')
        }
    }

    return (
        <NavLink
            to="/dashboard/bookings"
            className={({ isActive }) => (isActive ? 'text-blue-600' : 'text-black')}
            onClick={(e) => {
                e.preventDefault()
                handleClick()
            }}
        >
            Bokning
        </NavLink>
    )
}

export default BookingLink
