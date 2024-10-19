import { useNavigate } from 'react-router-dom'
import FormComponent from '../../components/formComponents'
import { useUserStore } from '../../store/useUserStore'
import { useState } from 'react'
import { API_URL } from '@/config'

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
        console.log('API URL:', API_URL);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()
            console.log('Response data:', data)

            if (response.ok) {
                localStorage.setItem('token', data.token)
                setUser(data.user)

                if (data.user.roles.includes('admin')) {
                    navigate('/admin/dashboard')
                } else {
                    navigate('/dashboard')
                }
            } else {
                setError(data.message || 'Login failed')
                console.error('Login failed:', data.message, error)
            }
        } catch (error) {
            setError('Error login in')
            console.error('Error logging in:', error)
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-20">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <FormComponent fields={loginFields} buttonText="Login" onSubmit={handleLogin} />
        </div>
    )
}

export default LoginPage
