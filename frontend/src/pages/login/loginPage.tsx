import { useNavigate } from 'react-router-dom'
import FormComponent from '../../components/formComponents'
import { useState } from 'react'

const LoginPage = () => {
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState<{ name: string; email: string; roles: string[] } | null>(null)

    const loginFields = [
        {
            label: 'Email',
            type: 'email',
            placeholder: 'Enter email',
            name: 'email',
        },
        {
            label: 'Password',
            type: 'text',
            placeholder: 'Enter password',
            name: 'password',
        },
    ]

    const handleLogin = async (formData: { [key: string]: string }) => {
        const email = formData.email
        const password = formData.password

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            console.log('Response data:', data)

            if (response.ok) {
                // Spara tokenen lokalt (t.ex. i localStorage)
                localStorage.setItem('token', data.token)
                navigate('/dashboard')

                setUser(data.user)

                setIsLoggedIn(true)

                // Om du vill visa användarinformation eller navigera till annan sida:
                console.log('Logged in successfully:', data.user)
                // Redirect eller uppdatera state för inloggning
            } else {
                console.error('Login failed:', data.message)
            }
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        setUser(null)
        setIsLoggedIn(false)
        console.log('Logged out')
    }

    return (
        <div>
            <h2>Login</h2>
            {isLoggedIn ? (
                <div>
                    <h3>Welcome, {user?.name} !</h3>
                    {/* <p>Roles: {user?.roles?.length ? user.roles.join(', ') : 'No roles assigned'}</p> */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <FormComponent fields={loginFields} buttonText="Login" onSubmit={handleLogin} />
            )}
        </div>
    )
}
export default LoginPage
