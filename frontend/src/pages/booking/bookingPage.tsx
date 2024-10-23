import { useUserStore } from '@/store/useUserStore'
import { NavLink } from 'react-router-dom'
import BookingForm from '@/pages/dashboard/components/bookingForm'
import { Button } from '@/components/ui/button'
import Layout from '@/components/Layout'

const BookingPage = () => {
    const user = useUserStore((state) => state.user)

    return (
        <Layout>
            <>
                <h2 className="text-3xl font-bold text-center mt-10">Book an Appointment</h2>
                <hr className="mt-2 mb-4 w-3/4 mx-auto" />

                {!user ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-4">Welcome to Lumi Locks</h2>
                        <p className="mb-6">
                            Ready for a new look? To book an appointment, you need to log in or
                            create an account.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <NavLink to="/login">
                                <Button size="lg" className="mt-4">
                                    Log In
                                </Button>
                            </NavLink>
                            <NavLink to="/register">
                                <Button size="lg" className="mt-4">
                                    Create Account
                                </Button>
                            </NavLink>
                        </div>
                    </div>
                ) : (
                    <BookingForm />
                )}
            </>
        </Layout>
    )
}

export default BookingPage
