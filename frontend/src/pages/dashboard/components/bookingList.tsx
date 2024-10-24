import { useEffect, useState } from 'react'
import DialogComponent from '@/components/DialogComponent'
import Layout from '@/components/Layout'
import { API_URL } from '@/config'
import { Booking } from '@/interfaces/Booking'
import { useUserStore } from '@/store/useUserStore'

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

                const response = await fetch(`${API_URL}/bookings/user`, {
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

    const handleCancelBooking = async (bookingId: string) => {
        console.log('Canceling booking with ID:', bookingId)
        const token = localStorage.getItem('token')
        if (!token) {
            console.error('No token found')
            return
        }

        try {
            const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                throw new Error(`Failed to cancel booking: ${response.status}`)
            }
            setBookings((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== bookingId)
            )
            console.log('Booking canceled successfully')
        } catch (error) {
            console.error('Error canceling booking:', error)
        }
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-6">Your Bookings</h2>
                {bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking._id} className="border rounded-lg p-4 mb-4 shadow-md">
                            <h3 className="text-lg font-semibold">
                                {booking.service && booking.service.length > 0
                                    ? booking.service.map((s) => s.name).join(', ')
                                    : 'No services available'}
                            </h3>
                            <p>
                                <strong>Date:</strong>{' '}
                                {new Date(booking.date).toLocaleDateString('en-GB', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: 'Europe/Stockholm',
                                })}
                            </p>
                            <p>
                                <strong>Time:</strong>{' '}
                                {new Date(booking.startTime).toLocaleTimeString('en-GB', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    timeZone: 'Europe/Stockholm', // Use Stockholm time zone
                                })}
                            </p>
                            <p>
                                <strong>Employee:</strong> {booking.employee.name}
                            </p>
                            <p>
                                <strong>Notes:</strong> {booking.notes || 'No notes'}
                            </p>

                            <div className="mt-4">
                                <DialogComponent
                                    title="Cancel Booking"
                                    description="Are you sure you want to cancel this booking?"
                                    triggerText="Cancel appointment"
                                    onConfirm={() => handleCancelBooking(booking._id)}
                                    confirmText="Yes, cancel"
                                    cancelText="No, keep it"
                                    isDeleteConfirmation={true}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>You have no upcoming bookings</p>
                )}
            </div>
        </Layout>
    )
}

export default UserBookingsList
