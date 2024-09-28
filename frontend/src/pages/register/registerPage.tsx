import CreateUserComponent from "../../components/CreateUserComponent"

const RegisterPage = () => {


    return (
        <div>
            <CreateUserComponent 
            onSuccess={() => console.log('User created successfully')}
            buttonText="Register"
            />
        </div>
    )
}
export default RegisterPage
