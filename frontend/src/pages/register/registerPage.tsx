import CreateUserComponent from "../../components/CreateUserComponent"

const RegisterPage = () => {


    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
            <CreateUserComponent 
                onSuccess={() => console.log('User created successfully')}
                buttonText="Register"
            />
        </div>
    );
}
export default RegisterPage
