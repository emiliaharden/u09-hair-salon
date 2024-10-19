import { useEffect, useState } from 'react'
import ServiceSelectionComponent from '@/components/ServiceSelectionComponent'
import { API_URL } from '@/config'
import { Service } from '@/store/useServiceStore'

interface User {
    _id: string
    name: string
    roles: string[]
}

const BookingForm = () => {
    const [date, setDate] = useState('')
    const [startTime, setStartTime] = useState('') // Starttid för bokningen
    const [endTime, setEndTime] = useState('') // Sluttid för bokningen
    const [notes, setNotes] = useState('')
    const [employee, setEmployee] = useState('') // Employee ID
    const [employees, setEmployees] = useState<User[]>([]) //Lista över frisörer
    const [selectedServices, setSelectedServices] = useState<string[]>([]) // Valda tjänster
    const [availableServices, setAvailableServices] = useState<Service[]>([]) // Tillgängliga tjänster

    // Hämta en lista över frisörer från backend
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
                setAvailableServices(data) // Sätt tillgängliga tjänster
            } catch (error) {
                console.error('Error fetching services:', error)
            }
        }

        fetchServices()
    }, [])

    // Beräkna sluttid baserat på starttid och vald tjänsts varaktighet
    useEffect(() => {
        if (startTime && selectedServices.length > 0) {
            const totalDuration = selectedServices.reduce((total, serviceId) => {
                const service = availableServices.find((s) => s._id === serviceId)
                return service ? total + service.duration : total
            }, 0)

            if (totalDuration > 0) {
                const calculatedEndTime = calculateEndTime(startTime, totalDuration) // Använd calculateEndTime här
                setEndTime(calculatedEndTime)

                // Logga den beräknade sluttiden och den totala varaktigheten
                console.log('Start Time:', startTime)
                console.log('Total Duration (mins):', totalDuration)
                console.log('Calculated End Time:', calculatedEndTime)
            }
        }
    }, [startTime, selectedServices, availableServices])

    // Funktion för att beräkna sluttiden baserat på starttid och varaktighet
    const calculateEndTime = (start: string, duration: number) => {
        const [hours, minutes] = start.split(':').map(Number)
        const startDateTime = new Date()
        startDateTime.setHours(hours)
        startDateTime.setMinutes(minutes)

        const endDateTime = new Date(startDateTime.getTime() + duration * 60000) // Lägg till varaktigheten i minuter
        const endHours = String(endDateTime.getHours()).padStart(2, '0')
        const endMinutes = String(endDateTime.getMinutes()).padStart(2, '0')
        return `${endHours}:${endMinutes}`
    }

    const convertToUTC = (date: string, time: string) => {
        const localDateTime = new Date(`${date}T${time}:00`);
        return new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();
    };
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        // Konvertera lokal tid till UTC innan du skickar den till backend
        const startDateTimeUTC = convertToUTC(date, startTime);
        const endDateTimeUTC = convertToUTC(date, endTime);
    
        console.log("Start DateTime (UTC):", startDateTimeUTC);
        console.log("End DateTime (UTC):", endDateTimeUTC);
    
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found');
            return;
        }
    
        const bookingData = {
            service: selectedServices,
            date, // Skickar datumet som sträng
            startTime: startDateTimeUTC, // Skicka starttiden som UTC
            endTime: endDateTimeUTC, // Skicka sluttiden som UTC
            notes,
            employee,
        };
    
        console.log("Booking data:", bookingData); // Logga data som skickas
    
        try {
            const response = await fetch(`${API_URL}/bookings`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(bookingData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to create booking');
            }
    
            const data = await response.json();
            console.log('Booking created successfully:', data);
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a Booking</h2>

            <ServiceSelectionComponent
                selectedServices={selectedServices}
                setSelectedServices={(services) => setSelectedServices(services)} // Funktionen som tar en array
            />

            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>

            <label>
                Start Time:
                <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                />
            </label>

            <label>
                End Time (Calculated):
                <input type="time" value={endTime} readOnly />
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
