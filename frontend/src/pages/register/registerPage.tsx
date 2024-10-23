import Layout from '@/components/Layout'
import CreateUserComponent from '../../components/CreateUserComponent'

const RegisterPage = () => {
    return (
        <Layout>
            <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg mt-20">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <CreateUserComponent
                    onSuccess={() => console.log('User created successfully')}
                    buttonText="Register"
                />
            </div>
        </Layout>
    )
}

export default RegisterPage
