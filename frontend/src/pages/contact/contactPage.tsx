import Layout from '@/components/Layout'

const ContactPage = () => {
    return (
        <Layout>
            <div className="p-4 text-center mt-10">
                <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                <hr className="mt-2 mb-4 w-3/4 mx-auto" />

                <p className="text-lg w-3/4 mx-auto mb-6">
                    Do you have any questions or need assistance? Don't hesitate to reach out to us
                    – we are here to help!
                </p>

                <div className="w-3/4 mx-auto border rounded-lg p-6 shadow-md">
                    <p className="text-left mb-4">
                        <strong>Email:</strong> info@salongsaxen.com
                    </p>
                    <p className="text-left mb-4">
                        <strong>Phone:</strong> 08 - XXX XX XX
                    </p>
                    <p className="text-left">
                        <strong>Address:</strong> Frisörgatan 1, 123 45 Stockholm
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default ContactPage
