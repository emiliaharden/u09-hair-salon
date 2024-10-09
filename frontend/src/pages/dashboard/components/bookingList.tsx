import { Booking } from '@/interfaces/Booking'
import { useUserStore } from '@/store/useUserStore'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserBookingsList = () => {
    const user = useUserStore((state) => state.user)
    const [bookings, setBookings] = useState<Booking[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        console.log('User in UserBookingsList:', user)
        const fetchBookings = async () => {
            if (!user || !user.id) {
                console.error('No user ID found')
                return
            }

            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    throw new Error('No token found')
                }

                const response = await fetch(`http://localhost:3000/api/bookings/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error(`Something went wrong: ${response.status}`)
                }

                const data = await response.json()
                console.log(data)
                setBookings(data)
            } catch (error: any) {
                setError(error.message)
                console.error('Error fetching user bookings:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchBookings()
    }, [user])

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <div>
            <h2>Your Bookings</h2>
            {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <div key={booking._id}>
                        <h3>{booking.service.join(', ')}</h3>
                        <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                        <p>Status: {booking.status} </p>
                        <p>Employee: {booking.employee.name}</p>
                        <p>Notes: {booking.notes || 'No notes'} </p>

                        <Link to={`/bookings/${booking._id}`}>View Details</Link>
                    </div>
                ))
            ) : (
                <p>No bookings found</p>
            )}
        </div>
    )
}

export default UserBookingsList
