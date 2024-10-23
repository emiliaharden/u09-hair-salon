import { useState } from 'react'
import { Pen, Trash2 } from 'lucide-react'
import DialogComponent from '../DialogComponent'
import { User } from '@/pages/admin/components/adminUsersPage'
import { Service } from '@/store/useServiceStore'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input' // Import Shadcn's Input

interface ActionsProps {
    rowData: User | Service
    onEdit: (item: User | Service) => void
    onDelete: (itemId: string) => void
}

// Type guard för att avgöra om rowData är en User
const isUser = (rowData: User | Service): rowData is User => {
    return (rowData as User).roles !== undefined;
}

const Actions: React.FC<ActionsProps> = ({ rowData, onEdit, onDelete }) => {
    const [updatedData, setUpdatedData] = useState(rowData)
    const [isAdmin, setIsAdmin] = useState(isUser(rowData) && rowData.roles.includes('admin'))

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        setUpdatedData({ ...updatedData, [field]: e.target.value })
    }

    const handleSave = () => {
        if (isUser(updatedData)) {
            const updatedWithRole = {
                ...updatedData,
                roles: isAdmin ? ['admin'] : ['user'],
            }
            onEdit(updatedWithRole)
        } else if ('duration' in updatedData) {
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
                title={isUser(rowData) ? 'Edit user' : 'Edit service'}
                description={isUser(rowData) ? 'Update user details' : 'Update service details'}
                triggerText={
                    <span className=" hover:text-blue-700 cursor-pointer">
                        <Pen size={20} />
                    </span>
                }
                onConfirm={handleSave}
            >
                <Input
                    type="text"
                    value={updatedData.name}
                    onChange={(e) => handleInputChange(e, 'name')}
                    placeholder="Name"
                />
                {'duration' in updatedData && (
                    <>
                        <Input
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
                        <Input
                            type="number"
                            value={updatedData.price}
                            onChange={(e) => handleInputChange(e, 'price')}
                            placeholder="Price"
                        />
                    </>
                )}
                {isUser(updatedData) && (
                    <>
                        <Input
                            type="email"
                            value={updatedData.email}
                            onChange={(e) => handleInputChange(e, 'email')}
                            placeholder="Email"
                        />

                        {/* Checkbox för rollhantering (Admin) */}
                        <div className="flex items-center mt-4">
                            <Label>Admin</Label>
                            <Checkbox
                                checked={isAdmin}
                                onCheckedChange={() => setIsAdmin(!isAdmin)}
                            />
                        </div>
                    </>
                )}
            </DialogComponent>

            {/* Dialog for Delete action with Trash2 icon */}
            <DialogComponent
                title={isUser(rowData) ? 'Delete user' : 'Delete service'}
                description={`Are you sure you want to delete ${rowData.name}?`}
                triggerText={
                    <span className=" hover:text-red-700 cursor-pointer">
                        <Trash2 size={20} />
                    </span>
                }
                onConfirm={handleDelete}
                isDeleteConfirmation={true}
            />
        </div>
    )
}

export default Actions
