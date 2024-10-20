import { useUserStore } from '@/store/useUserStore'
import { NavLink } from 'react-router-dom'
import BookingForm from '@/pages/dashboard/components/bookingForm'
import { Button } from '@/components/ui/button' 

const BookingPage = () => {
    const user = useUserStore((state) => state.user)

    return (
        <>
            <h2 className="text-3xl font-bold text-center mt-10">Boka tid</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            {!user ? (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Välkommen till Salong Saxen</h2>
                    <p className="text-gray-700 mb-6">
                        Är du redo för en ny stil? För att boka en tid behöver du logga in eller skapa ett konto.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <NavLink to="/login">
                            <Button size="lg" className="mt-4">
                                Logga in
                            </Button>
                        </NavLink>
                        <NavLink to="/register">
                            <Button size="lg" className="mt-4">
                                Skapa konto
                            </Button>
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Boka din tid</h2>
                    <BookingForm />
                </div>
            )}
        </>
    )
}

export default BookingPage
