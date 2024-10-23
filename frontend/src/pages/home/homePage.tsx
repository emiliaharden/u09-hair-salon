import BookingLink from '@/components/BookingLink'
import Layout from '@/components/Layout'
import { Button } from '@/components/ui/button'

const HomePage = () => {
    return (
        <Layout>
            <div className="p-4 text-center mt-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Welcome to us!</h2>
                <hr className="mt-2 mb-4 w-full md:w-3/4 mx-auto" />

                <p className="text-base md:text-lg w-full md:w-3/4 mx-auto">
                    At Salon Lumi Locks, we offer an experience that combines style and perfection.
                    Discover our exclusive treatments, designed to give you a sense of luxury and
                    well-being. Our skilled hairdressers ensure that every cut and treatment is
                    tailored to highlight your unique style and personality.
                </p>
                <br />
                <p className="text-base md:text-lg w-full md:w-3/4 mx-auto">
                    Book your appointment today and let us take care of you with personalized care
                    and expertise. With us, every cut and treatment is "cut to perfection" to give
                    you the very best.
                </p>

                <BookingLink>
                    <Button
                        size="lg"
                        className="mt-8 w-full md:w-auto h-12 md:h-14 text-base md:text-lg"
                    >
                        Want to book an appointment?
                    </Button>
                </BookingLink>

                {/* This section is only visible on screens larger than mobile devices */}
                <div className="hidden md:flex w-full h-64 mt-10 mb-8 justify-center items-end gap-x-4 pb-6">
                    <BookingLink>
                        <Button
                            size="lg"
                            className="w-48 h-16 flex flex-col justify-center items-center"
                        >
                            <span>Book Now</span>
                        </Button>
                    </BookingLink>
                    <Button
                        size="lg"
                        className="w-48 h-16 flex flex-col justify-center items-center"
                    >
                        <span>Call us</span>
                        <span>08-XXX XX XX</span>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default HomePage
