import { useUserStore } from '@/store/useUserStore'

const AdminDashboardOverview: React.FC = () => {
    const user = useUserStore((state) => state.user)

    if (!user) return null

    return (
        <div className="p-4 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-6 md:mt-10">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">
                Välkommen, {user.name}!
            </h2>
            <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-sm md:text-base mb-2">
                    <strong>Email:</strong> {user.email}
                </p>
                <p className="text-sm md:text-base mb-2">
                    <strong>Roll:</strong> {user.roles.join(', ')}
                </p>
                <p className="text-sm md:text-base text-gray-600 mt-4">
                    Kanske visa senaste aktiviteter och annan data här sen.
                </p>
            </div>
        </div>
    )
}

export default AdminDashboardOverview
