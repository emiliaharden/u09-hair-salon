import { useState } from 'react'
import DialogComponent from '../DialogComponent';
import { User } from '@/pages/admin/components/adminUsersPage';

interface ActionsProps {
    rowData: User
    onEdit: (user: User) => void
    onDelete: (userId: string) => void
}

const Actions: React.FC<ActionsProps> = ({ rowData, onEdit, onDelete }) => {
    const [updatedUserData, setUpdatedUserData] = useState(rowData)

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        field: string
    ) => {
        setUpdatedUserData({ ...updatedUserData, [field]: e.target.value })
    }

    const handleSave = () => {
        onEdit(updatedUserData)
    }

    const handleDelete = () => {
        console.log('Deleting:', rowData)
        onDelete(rowData._id)
    }

    return (
        <div>
            <DialogComponent
                title="Edit user"
                description="Update user details"
                triggerText="Edit"
                onConfirm={handleSave}
            >
                <input
                    type="text"
                    value={updatedUserData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="Name"
                />
                <input
                    type="email"
                    value={updatedUserData.email}
                    onChange={(e) => handleInputChange(e, 'email')}
                    placeholder="Email"
                />
                <select
                    value={updatedUserData.roles[0]}
                    onChange={(e) => handleInputChange(e, 'roles')}
                >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </DialogComponent>

            <DialogComponent
            title='Delete user'
            description={`Are you sure you want to delete ${rowData.name}?`}
            triggerText='Delete'
            onConfirm={handleDelete}
            isDeleteConfirmation={true}
            />
            
            
        </div>
    )
}

export default Actions
