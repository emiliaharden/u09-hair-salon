import { useNavigate } from 'react-router-dom'
import { useUserStore } from '@/store/useUserStore'

const BookingLink: React.FC<React.PropsWithChildren> = ({ children }) => {
    const user = useUserStore((state) => state.user)
    const navigate = useNavigate()

    const handleClick = () => {
        if (user) {
            navigate('/dashboard/bookings')
        } else {
            navigate('/login')
        }
    }

    return <div onClick={handleClick}>{children}</div>
}

export default BookingLink
