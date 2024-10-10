import { useUserStore } from '@/store/useUserStore'

const UserOverview = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <div>
            <h2>User Overview</h2>
            <p>Welcome, {user.name}!</p>
            <p>Email: {user.email}</p>
            <p>Role(s): {user.roles.join(', ')}</p>
        </div>
    )
}

export default UserOverview
