import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

const DashboardPage = () => {
    const navigate = useNavigate()
    const user = useUserStore((state) => state.user)
    const clearUser = useUserStore((state) => state.clearUser)

    const handleLogout = () => {
        localStorage.removeItem('token')
        console.log(localStorage)
        clearUser()
        navigate('/login')
        console.log('Logged out')
    }

    if (!user) return null

    return (
        <div>
            <h2>User dashboard</h2>
            <p>Welcome to your dashboard, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your roles: {user.roles.join(', ')}</p>

            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default DashboardPage