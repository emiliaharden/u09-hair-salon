// SettingsComponent.tsx
import DialogComponent from '@/components/DialogComponent'
import FormComponent from '@/components/formComponents'
import { API_URL } from '@/config'
import { useState } from 'react'

interface SettingsComponentProps {
    userId: string
    userRole: string
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({ userId, userRole }) => {
    const [message, setMessage] = useState('')

    const fields = [
        {
            label: 'Current Password',
            type: 'password',
            placeholder: 'Enter current password',
            name: 'currentPassword',
        },
        {
            label: 'New Password',
            type: 'password',
            placeholder: 'Enter new password',
            name: 'newPassword',
        },
        {
            label: 'Confirm New Password',
            type: 'password',
            placeholder: 'Confirm new password',
            name: 'confirmPassword',
        },
    ]

    const handleSubmit = async (formData: { [key: string]: string }) => {
        const { currentPassword, newPassword, confirmPassword } = formData

        if (newPassword !== confirmPassword) {
            setMessage('New password and confirmation do not match.')
            return
        }

        try {
            const response = await fetch(`${API_URL}/user/${userId}/update-password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            })

            if (response.ok) {
                setMessage('Password successfully changed!')
            } else {
                const data = await response.json()
                setMessage(`Error: ${data.message}`)
            }
        } catch (error) {
            setMessage(
                error instanceof Error ? `Error: ${error.message}` : 'An unknown error occurred'
            )
        }
    }

    return (
        <div className="container mx-auto p-6 max-w-lg">
            <h2 className="text-2xl font-bold mb-4">
                {userRole === 'admin' ? 'Admin Settings' : 'User Settings'}
            </h2>
            <div className="bg-white shadow-md rounded-lg p-6">
                <DialogComponent
                    triggerText="Change Password"
                    title="Change Password"
                    description="Please enter your current and new password to update your credentials."
                    onConfirm={() => {}}
                >
                    <FormComponent
                        fields={fields}
                        buttonText="Change Password"
                        onSubmit={handleSubmit}
                    />
                </DialogComponent>

                {message && (
                    <p
                        className={`mt-4 ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}

export default SettingsComponent
