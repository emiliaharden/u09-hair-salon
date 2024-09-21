import FormComponent from '../../components/formComponents'

const RegisterPage = () => {
    const registerFields = [
        {
            label: 'Name',
            type: 'text',
            placeholder: 'Enter name',
            name: 'name',
        },
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            name: 'email',
        },
        {
            label: 'Password',
            type: 'password',
            placeholder: 'Enter password',
            name: 'password',
        },
        {
            label: 'Confirm password',
            type: 'password',
            placeholder: 'Enter password',
            name: 'password',
        },
    ]

    return (
        <div>
            <h2>Register</h2>
            <FormComponent
                fields={registerFields}
                buttonText="Register"
                onSubmit={(data) => console.log('Register form data:', data)}
            />
        </div>
    )
}
export default RegisterPage
