import { useEffect, useState } from 'react'
import ServiceSelectionComponent from '@/components/ServiceSelectionComponent'
import { API_URL } from '@/config'
import { Service } from '@/store/useServiceStore'
import { Button } from '@/components/ui/button'

interface User {
    _id: string
    name: string
    roles: string[]
}

const BookingForm = () => {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [notes, setNotes] = useState('')
    const [employee, setEmployee] = useState('')
    const [employees, setEmployees] = useState<User[]>([])
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [availableServices, setAvailableServices] = useState<Service[]>([])

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                console.error('No token found')
                return
            }

            try {
                const response = await fetch(`${API_URL}/admins`, {
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

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/services', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch services')
                }

                const data = await response.json()
                setAvailableServices(data)
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchServices()
    }, [])

    useEffect(() => {
        if (startTime && selectedServices.length > 0) {
            const totalDuration = selectedServices.reduce((total, serviceId) => {
                const service = availableServices.find((s) => s._id === serviceId)
                return service ? total + service.duration : total
            }, 0)

            if (totalDuration > 0) {
                const calculatedEndTime = calculateEndTime(startTime, totalDuration)
                setEndTime(calculatedEndTime)

                console.log('Start Time:', startTime)
                console.log('Total Duration (mins):', totalDuration)
                console.log('Calculated End Time:', calculatedEndTime)
            }
        }
    }, [startTime, selectedServices, availableServices])

    const calculateEndTime = (start: string, duration: number) => {
        const [hours, minutes] = start.split(':').map(Number)
        const startDateTime = new Date()
        startDateTime.setHours(hours)
        startDateTime.setMinutes(minutes)

        const endDateTime = new Date(startDateTime.getTime() + duration * 60000)
        const endHours = String(endDateTime.getHours()).padStart(2, '0')
        const endMinutes = String(endDateTime.getMinutes()).padStart(2, '0')
        return `${endHours}:${endMinutes}`
    }

    const convertToUTC = (date: string, time: string) => {
        const localDateTime = new Date(`${date}T${time}:00`)
        return new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const startDateTimeUTC = convertToUTC(date, startTime)
        const endDateTimeUTC = convertToUTC(date, endTime)

        console.log('Start DateTime (UTC):', startDateTimeUTC)
        console.log('End DateTime (UTC):', endDateTimeUTC)

        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No token found')
            return
        }

        const bookingData = {
            service: selectedServices,
            date,
            startTime: startDateTimeUTC,
            endTime: endDateTimeUTC,
            notes,
            employee,
        }

        console.log('Booking data:', bookingData)

        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            })

            if (!response.ok) {
                throw new Error('Failed to create booking')
            }

            const data = await response.json()
            console.log('Booking created successfully:', data)
        } catch (error) {
            console.error('Error creating booking:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center">Create a Booking</h2>

            <div className="space-y-4">
                <ServiceSelectionComponent
                    selectedServices={selectedServices}
                    setSelectedServices={(services) => setSelectedServices(services)}
                />

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Date:</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Start Time:</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="p-2 border rounded"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">End Time (Calculated):</label>
                    <input
                        type="time"
                        value={endTime}
                        readOnly
                        className="p-2 border rounded bg-gray-100"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Employee:</label>
                    <select
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        className="p-2 border rounded"
                    >
                        <option value="">Select Employee</option>
                        {employees.map((emp) => (
                            <option key={emp._id} value={emp._id}>
                                {emp.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm font-medium">Notes:</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="p-2 border rounded"
                        placeholder="Any special notes?"
                    />
                </div>
            </div>

            <Button variant="default" size="lg" className="w-full" type="submit">
                Create Booking
            </Button>
        </form>
    )
}

export default BookingForm
