const ContactPage = () => {
    return (
        <div className="p-4 text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Kontakta oss</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-6">
                Har du några frågor eller behöver hjälp? Tveka inte att höra av dig till oss – vi finns här för att hjälpa dig!
            </p>

            <div className="w-3/4 mx-auto border border-gray-300 rounded-lg p-6 shadow-md">
                <p className="text-gray-700 text-left mb-4">
                    <strong>Email:</strong> info@salongsaxen.com
                </p>
                <p className="text-gray-700 text-left mb-4">
                    <strong>Telefon:</strong> 08 - XXX XX XX
                </p>
                <p className="text-gray-700 text-left">
                    <strong>Adress:</strong> Frisörgatan 1, 123 45 Stockholm
                </p>
            </div>

        </div>
    )
}

export default ContactPage;
