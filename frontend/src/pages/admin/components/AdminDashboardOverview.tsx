import { useUserStore } from '@/store/useUserStore'

const AdminDashboardOverview: React.FC = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null
    return (
        <div>
            <h2>Admin Dashboard Overview</h2>
            <p>Welcome to your dashboard, {user.name}!</p>
            <p>Your email: {user.email}</p>
            <p>Your roles: {user.roles.join(', ')}</p>
            <p>Kanske visa senaste aktiviter och annan data här sen </p>
        </div>
    )
}

export default AdminDashboardOverview
