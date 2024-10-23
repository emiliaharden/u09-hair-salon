import { useUserStore } from '@/store/useUserStore'

const UserOverview = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Welcome, {user.name}!
            </h2>
            <div className="flex flex-col items-center space-y-2">
                <p className="text-gray-600">
                    What would you like to do today?
                </p>
            </div>
        </div>
    )
}

export default UserOverview
