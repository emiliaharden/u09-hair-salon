import { useState } from 'react'
import { Pen, Trash2 } from 'lucide-react' // Importing the Pen and Trash2 icons from lucide-react
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
        <div className="flex items-center space-x-2">
            {/* Dialog for Edit action with Pen icon */}
            <DialogComponent
                title={'duration' in rowData ? 'Edit service' : 'Edit user'}
                description={
                    'duration' in rowData ? 'Update service details' : 'Update user details'
                }
                triggerText={
                    <button className="text-blue-500 hover:text-blue-700">
                        <Pen size={20} /> {/* Use Pen icon here */}
                    </button>
                }
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

            {/* Dialog for Delete action with Trash2 icon */}
            <DialogComponent
                title={'duration' in rowData ? 'Delete service' : 'Delete user'}
                description={`Are you sure you want to delete ${rowData.name}?`}
                triggerText={
                    <button className="text-red-500 hover:text-red-700">
                        <Trash2 size={20} /> {/* Use Trash2 icon here */}
                    </button>
                }
                onConfirm={handleDelete}
                isDeleteConfirmation={true}
            />
        </div>
    )
}

export default Actions
