import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'

const AdminDashboardPage = () => {
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

    const handleCreateUser = () => {
        navigate('/admin/create-user')
    }

    if (!user) return null

    return (
        <div>
            <p>Welcome to your dashboard, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your roles: {user.roles.join(', ')}</p>

            <div className='flex flex-col' >
                
                <h3>Manage users</h3>
                <button onClick={handleCreateUser}>Create user</button>
                <button>Update user</button>
                <button>Delete user</button>
            </div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default AdminDashboardPage
