import { useNavigate } from 'react-router-dom'
import FormComponent from '../../components/formComponents'
import { useUserStore } from '../../store/useUserStore'
import { useState } from 'react'

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null)
    const setUser = useUserStore((state) => state.setUser)
    const navigate = useNavigate()

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
        const { email, password } = formData

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
                setUser(data.user)

                if (data.user.roles.includes('admin')) {
                    navigate('/admin/dashboard')
                } else {
                    navigate('/dashboard')
                }

                // Om du vill visa användarinformation eller navigera till annan sida:
                console.log('Logged in successfully:', data.user)
                // Redirect eller uppdatera state för inloggning
            } else {
                setError(data.message || 'Login failed')
                console.error('Login failed:', data.message, error)
            }
        } catch (error) {
            setError('Error login in')
            console.error('Error logging in:', error)
        }
    }

    // const handleLogout = () => {
    //     localStorage.removeItem('token')
    //     setUser(null)
    //     setIsLoggedIn(false)
    //     console.log('Logged out')
    // }

    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <FormComponent fields={loginFields} buttonText="Login" onSubmit={handleLogin} />
        </div>
    )
}
export default LoginPage
