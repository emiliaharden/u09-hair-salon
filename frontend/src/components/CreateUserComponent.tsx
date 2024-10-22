import { useState } from 'react'
import FormComponent from './formComponents'
import { useUserStore } from '../store/useUserStore'
import { API_URL } from '@/config'
import { Label } from '@/components/ui/label' // Shadcn Label
import { Checkbox } from '@/components/ui/checkbox' // Shadcn Checkbox

interface createUserProps {
    onSuccess?: () => void
    buttonText: string
}

const CreateUserComponent = ({ onSuccess, buttonText }: createUserProps) => {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const user = useUserStore((state) => state.user)

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
            placeholder: 'Confirm password',
            name: 'confirmPassword',
        },
    ]

    const handleCreate = async (formData: { [key: string]: string | boolean }) => {
        const { name, email, password, confirmPassword } = formData as { [key: string]: string };
    
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
    
        try {
            const response = await fetch(`${API_URL}/auth/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    roles: isAdmin ? 'admin' : 'user',
                }),
            });
    
            const data = await response.json();
            console.log(data);
    
            if (response.ok) {
                setSuccess('User registered successfully!');
                setError(null);
                if (onSuccess) onSuccess();
            } else {
                setError(data.message || 'Error registering user');
            }
        } catch (error) {
            console.error(error);
            setError('Error registering user');
        }
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            
            {/* FormComponent with Shadcn's Input and Label */}
            <FormComponent
                fields={registerFields}
                buttonText={buttonText}
                onSubmit={handleCreate}
            />

            {user?.roles.includes('admin') && (
                <div className="mt-4">
                    <Label>Admin</Label> {/* Shadcn Label */}
                    <Checkbox
                        checked={isAdmin}
                        onCheckedChange={() => setIsAdmin(!isAdmin)}
                    />
                </div>
            )}
        </div>
    )
}

export default CreateUserComponent
