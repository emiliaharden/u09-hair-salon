import Layout from '@/components/Layout'
import { useUserStore } from '@/store/useUserStore'

const UserOverview = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <Layout>
            <div className="shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-bold text-center mb-4">Welcome, {user.name}!</h2>
                <div className="flex flex-col items-center space-y-2">
                    <p>What would you like to do today?</p>
                </div>
            </div>
        </Layout>
    )
}

export default UserOverview
