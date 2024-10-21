import { useEffect, useState } from 'react'
import ServiceSelectionComponent from '@/components/ServiceSelectionComponent'
import { API_URL } from '@/config'
import { Button } from '@/components/ui/button'
import { Schedule, Slot } from '@/interfaces/Schedule'
import { useServiceStore } from '@/store/useServiceStore'
import { User } from '@/interfaces/User'
import { Service } from '@/interfaces/Service'

const BookingForm = () => {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [notes, setNotes] = useState('')
    const [employee, setEmployee] = useState('')
    const [employees, setEmployees] = useState<User[]>([])
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([])
    const [error, setError] = useState<string | null>(null)

    const availableServices = useServiceStore((state) => state.services) // Hämta tjänster från Zustand

    // Hämta admins (frisörer)
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

    // Hämta lediga tider (slots) baserat på vald admin och datum
    useEffect(() => {
        if (date && employee) {
            const fetchAvailableSlots = async () => {
                const token = localStorage.getItem('token')
                if (!token) {
                    console.error('No token found')
                    return
                }

                try {
                    const response = await fetch(`${API_URL}/schedules/available?employee=${employee}&date=${date}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })

                    if (!response.ok) {
                        throw new Error(`Failed to fetch available slots: ${response.status}`)
                    }

                    const data = await response.json()
                    console.log("API response:", data)

                    if (data.length > 0) {
                        const slots = data.flatMap((schedule: Schedule) =>
                            schedule.slots.filter((slot: Slot) => !slot.isBooked)
                        )
                        setAvailableSlots(slots)
                    } else {
                        setError('No available slots for the selected date and employee.')
                        setAvailableSlots([])
                    }
                } catch (error) {
                    console.error('Error fetching available slots:', error)
                    setError('Failed to fetch available slots.')
                }
            }

            fetchAvailableSlots()
        }
    }, [date, employee])

    // Funktion för att kalkylera sluttiden baserat på starttid och valda tjänster
    const calculateEndTime = (startTime: string, services: Service[]): string => {
        const startDateTime = new Date(startTime)
        const totalDuration = services.reduce((sum, service) => sum + service.duration, 0)
        const endDateTime = new Date(startDateTime.getTime() + totalDuration * 60000)
        return endDateTime.toISOString()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedServices.length) {
            console.error('No services selected')
            return
        }

        const selectedServiceObjects = availableServices.filter(service => selectedServices.includes(service._id))
        const endDateTimeUTC = calculateEndTime(startTime, selectedServiceObjects)

        console.log('Start DateTime (UTC):', startTime)
        console.log('End DateTime (UTC):', endDateTimeUTC)

        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No token found')
            return
        }

        const bookingData = {
            service: selectedServices,
            date,
            startTime,
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
                    setSelectedServices={setSelectedServices}
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
                    <label className="text-sm font-medium">Employee (Optional):</label>
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
                    <label className="text-sm font-medium">Available Time Slots:</label>
                    {error && <p className="text-red-500">{error}</p>}
                    <select
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="p-2 border rounded"
                        required
                    >
                        <option value="">Select a time slot</option>
                        {availableSlots.map((slot, index) => (
                            <option key={index} value={slot.startTime}>
                                {new Date(slot.startTime).toLocaleDateString([], {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                })} - {new Date(slot.startTime).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
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
