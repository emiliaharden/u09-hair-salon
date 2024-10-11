import { useEffect, useState } from 'react'

interface User {
    _id: string
    name: string
    roles: string[]
}

const BookingForm = () => {
    const [service, setService] = useState('Select service')
    const [date, setDate] = useState('')
    const [notes, setNotes] = useState('')
    const [employee, setEmployee] = useState('') // Employee ID
    const [employees, setEmployees] = useState<User[]>([]) //Lista över frisörer

    //Hämta en lista över frisörer från backend

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('No token found')
                return
            }

            try {
                const response = await fetch('http://localhost:3000/api/admins', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error(`Failed to fetch employees: ${response.status}`)
                }

                const data = await response.json()

                setEmployees(data)
            } catch (error) {
                console.error('Error fetching employees:', error)
            }
        }

        fetchEmployees()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No token found')
            return
        }

        try {
            const response = await fetch('http://localhost:3000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    service,
                    date,
                    notes,
                    employee, //skickar employee till backend
                }),
            })

            if (!response.ok) {
                throw new Error('Failed to create booking')
            }

            const data = await response.json()
            console.log('Booking created successfully', data)
        } catch (error) {
            console.error('Error creating booking:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Booking</h2>

            <label>
                {' '}
                Service:
                <select value={service} onChange={(e) => setService(e.target.value)}>
                    <option value="Haircut">Haircut</option>
                    <option value="Color">Color</option>
                    <option value="Balayage">Balayage</option>
                </select>
            </label>

            <label>
                Date:
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>

            <label>
                Employee:
                <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
                    <option value="">Select Employee</option>
                    {employees.map((emp) => (
                        <option key={emp._id} value={emp._id}>
                            {emp.name}
                        </option>
                    ))}
                </select>
            </label>

            <label>
                {' '}
                Notes:
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special notes?"
                />
            </label>
            <button type="submit">Create Booking</button>
        </form>
    )
}

export default BookingForm