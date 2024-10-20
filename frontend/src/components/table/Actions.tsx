import { useState } from 'react'
import DialogComponent from '../DialogComponent'
import { User } from '@/pages/admin/components/adminUsersPage'
import { Service } from '@/store/useServiceStore'

interface ActionsProps {
    rowData: User | Service
    onEdit: (item: User | Service) => void
    onDelete: (itemId: string) => void
}

const Actions: React.FC<ActionsProps> = ({ rowData, onEdit, onDelete }) => {
    const [updatedData, setUpdatedData] = useState(rowData)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setUpdatedData({ ...updatedData, [field]: e.target.value })
    }

    const handleSave = () => {
        if ('duration' in updatedData) {
            const roundedDuration = Math.ceil(updatedData.duration / 30) * 30
            onEdit({ ...updatedData, duration: roundedDuration })
        } else {
            onEdit(updatedData)
        }
    }

    const handleDelete = () => {
        onDelete(rowData._id)
    }

    return (
        <div>
            <DialogComponent
                title={'duration' in rowData ? 'Edit service' : 'Edit user'}
                description={
                    'duration' in rowData ? 'Update service details' : 'Update user details'
                }
                triggerText="Edit"
                onConfirm={handleSave}
            >
                <input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="Name"
                />
                {'duration' in updatedData && (
                    <>
                        <input
                            type="number"
                            value={updatedData.duration}
                            onChange={(e) =>
                                setUpdatedData({
                                    ...updatedData,
                                    duration: Math.ceil(Number(e.target.value) / 30) * 30,
                                })
                            }
                            placeholder="Duration"
                            min={30}
                            step={30}
                        />
                        <input
                            type="number"
                            value={updatedData.price}
                            onChange={(e) => handleInputChange(e, 'price')}
                            placeholder="Price"
                        />
                    </>
                )}
                {'email' in updatedData && (
                    <input
                        type="email"
                        value={updatedData.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                        placeholder="Email"
                    />
                )}
            </DialogComponent>

            <DialogComponent
                title={'duration' in rowData ? 'Delete service' : 'Delete user'}
                description={`Are you sure you want to delete ${rowData.name}?`}
                triggerText="Delete"
                onConfirm={handleDelete}
                isDeleteConfirmation={true}
            />
        </div>
    )
}

export default Actions
