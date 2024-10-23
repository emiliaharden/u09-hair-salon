import Layout from '@/components/Layout'
import SettingsComponent from '@/components/SettingsComponent'
import { useUserStore } from '@/store/useUserStore'

const AdminSettingsPage: React.FC = () => {
    const { user } = useUserStore()

    return (
        <Layout>
            <div>
                {user ? (
                    <SettingsComponent userId={user.id} userRole="admin" />
                ) : (
                    <p>User is not logged in. Please log in to change your settings.</p>
                )}
            </div>
        </Layout>
    )
}

export default AdminSettingsPage
