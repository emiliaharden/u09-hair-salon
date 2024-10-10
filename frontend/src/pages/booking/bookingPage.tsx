import { useUserStore } from '@/store/useUserStore'
import { NavLink } from 'react-router-dom'
import BookingForm from '@/pages/dashboard/components/bookingForm'

const BookingPage = () => {
    const user = useUserStore((state) => state.user)

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            {!user ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Welcome to Our Salon</h2>
                    <p className="text-gray-700 mb-6">
                        Ready for a fresh new look? To book an appointment, please log in or create
                        an account.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <NavLink to="/login">
                            <button className="border border-black py-2 px-4 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                                Log in
                            </button>
                        </NavLink>
                        <NavLink to="/register">
                            <button className="border border-black py-2 px-4 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50">
                                Register
                            </button>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Book an Appointment</h2>
                    <BookingForm />
                </div>
            )}
        </div>
    )
}

export default BookingPage
