import { useState, useEffect } from 'react'
import TableComponent from '@/components/table/TableComponent'
import SearchComponent from '@/components/SearchComponent'
import DialogComponent from '@/components/DialogComponent'
import CreateUserComponent from '@/components/CreateUserComponent'
import { API_URL } from '@/config'

export interface User {
    _id: string
    name: string
    email: string
    roles: string[]
}

const AdminUsersPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([])

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${API_URL}/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                const data = await response.json()
                if (response.ok) {
                    setUsers(data)
                    setFilteredUsers(data)
                } else {
                    console.error('Error fetching users:', data.message)
                }
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        }

        fetchUsers()
    }, [])

    const handleSearch = (searchTerm: string) => {
        if (searchTerm === '') {
            setFilteredUsers(users)
        } else {
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        user.email.toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        }
    }

    const handleEditUser = async (updatedUser: User) => {
        try {
            const response = await fetch(`${API_URL}/user/${updatedUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(updatedUser),
            })
            const data = await response.json()

            if (response.ok) {
                setUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                )
                setFilteredUsers((prevUsers) =>
                    prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
                )
            } else {
                console.error('Error updating user:', data.message)
            }
        } catch (error) {
            console.error('Error updating user:', error)
        }
    }

    const handleDeleteUser = async (userId: string) => {
        try {
            const response = await fetch(`${API_URL}/user/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
            const data = await response.json()

            if (response.ok) {
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
                setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId))
            } else {
                console.error('Error deleting user:', data.message)
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        }
    }

    const userColumns = ['name', 'email', 'roles']

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-center mb-6" >Manage Users</h2>
            <SearchComponent onSearch={handleSearch} placeholder="Search users..." />
            <DialogComponent title="Create new user" triggerText="Create" onConfirm={() => {}}>
                <CreateUserComponent buttonText="Create user" />
            </DialogComponent>
            <TableComponent<User>
                data={filteredUsers}
                columns={userColumns}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
            />
        </div>
    )
}

export default AdminUsersPage
