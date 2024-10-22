import { useEffect, useState } from 'react'
import ServiceSelectionComponent from '@/components/ServiceSelectionComponent'
import { API_URL } from '@/config'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Schedule, Slot } from '@/interfaces/Schedule'
import { Service, useServiceStore } from '@/store/useServiceStore'
import { User } from '@/pages/admin/components/adminUsersPage'
import { toast } from 'sonner'

const BookingForm = () => {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('')
    const [notes, setNotes] = useState('')
    const [employee, setEmployee] = useState('')
    const [employees, setEmployees] = useState<User[]>([])
    const [selectedServices, setSelectedServices] = useState<string[]>([])
    const [availableSlots, setAvailableSlots] = useState<Slot[]>([])
    const [error, setError] = useState<string | null>(null)

    const availableServices = useServiceStore((state) => state.services)

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

    useEffect(() => {
        if (date && employee) {
            const fetchAvailableSlots = async () => {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('No token found');
                    return;
                }
    
                try {
                    const response = await fetch(`${API_URL}/schedules/available?employee=${employee}&date=${date}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    });
    
                    if (!response.ok) {
                        throw new Error(`Failed to fetch available slots: ${response.status}`);
                    }
    
                    const data = await response.json();
                    console.log("API response:", data);  // Logga hela API-responsen
    
                    // Kontrollera om det finns dubbletter genom att skapa en uppsättning med startTime
                    const uniqueSlots = data.flatMap((schedule: Schedule) =>
                        schedule.slots.filter((slot: Slot) => !slot.isBooked)
                    );
    
                    console.log("Unique Slots:", uniqueSlots);  // Logga de unika slotsen
    
                    setAvailableSlots(uniqueSlots);
                } catch (error) {
                    console.error('Error fetching available slots:', error);
                    setError('Failed to fetch available slots.');
                }
            };
    
            fetchAvailableSlots();
        }
    }, [date, employee]);
    

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

        const selectedServiceObjects = availableServices.filter((service) =>
            selectedServices.includes(service._id)
        )
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

            // Visa en bekräftelse-toast när bokningen är framgångsrik
            toast.success('Booking created successfully!')
        } catch (error) {
            console.error('Error creating booking:', error)
            toast.error('Failed to create booking')
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-lg w-full"
        >
            <h2 className="text-2xl font-semibold text-center">Create a Booking</h2>

            <div className="space-y-4">
                <ServiceSelectionComponent
                    selectedServices={selectedServices}
                    setSelectedServices={setSelectedServices}
                />

                <div className="flex flex-col">
                    <Label>Date:</Label>
                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="border-gray-300 rounded-md"
                    />
                </div>

                <div className="flex flex-col">
                    <Label>Employee (Optional):</Label>
                    <Select onValueChange={setEmployee}>
                        <SelectTrigger className="border-gray-300 rounded-md">
                            <SelectValue placeholder="Select Employee" />
                        </SelectTrigger>
                        <SelectContent>
                            {employees.map((emp) => (
                                <SelectItem key={emp._id} value={emp._id}>
                                    {emp.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col">
                    <Label>Available Time Slots:</Label>
                    {error && <p className="text-red-500">{error}</p>}
                    <Select onValueChange={setStartTime}>
                        <SelectTrigger className="border-gray-300 rounded-md">
                            <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                            {availableSlots.map((slot, index) => (
                                <SelectItem
                                    key={`${slot.startTime}-${index}`}
                                    value={slot.startTime}
                                >
                                    {new Date(slot.startTime).toLocaleDateString([], {
                                        year: 'numeric',
                                        month: '2-digit',
                                        day: '2-digit',
                                    })}{' '}
                                    -{' '}
                                    {new Date(slot.startTime).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col">
                    <Label>Notes:</Label>
                    <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special notes?"
                        className="border-gray-300 rounded-md"
                    />
                </div>
            </div>

            <Button
                variant="default"
                size="lg"
                className="w-full bg-black text-white hover:bg-gray-700"
                type="submit"
            >
                Create Booking
            </Button>
        </form>
    )
}

export default BookingForm
