import Layout from '@/components/Layout';
import { useUserStore } from '@/store/useUserStore';

const AdminDashboardOverview: React.FC = () => {
    const user = useUserStore((state) => state.user);

    if (!user) return null;

    return (
        <Layout>
            <div className="p-4 rounded-lg shadow-md max-w-lg mx-auto mt-6 md:mt-10">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
                    Welcome, {user.name}!
                </h2>
                <div className="p-4 rounded-lg">
                    <p className="text-sm md:text-base mb-2">
                        <strong>Email:</strong> {user.email}
                    </p>
                    <p className="text-sm md:text-base mb-2">
                        <strong>Role:</strong> {user.roles.join(', ')}
                    </p>
                    <p className="text-sm md:text-base mt-4">
                        Maybe show recent activities and other data here later.
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default AdminDashboardOverview;
