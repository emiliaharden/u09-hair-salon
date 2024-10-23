const TreatmentsPage = () => {
    return (
        <div className="p-4 text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Our Treatments</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-6">
                We offer a wide range of treatments to help you look and feel your best. From haircuts to color treatments – explore our services and find the perfect option for your needs.
            </p>

            <div className="w-3/4 mx-auto border border-gray-300 rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Haircuts */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Haircuts</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Women's Haircut</li>
                            <li>Men's Haircut</li>
                            <li>Children's Haircut</li>
                            <li>Beard Trimming</li>
                            <li>Cut & Styling</li>
                            <li>Bangs Trim</li>
                            <li>Buzz Cut</li>
                        </ul>
                    </div>

                    {/* Color Treatments */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Color Treatments</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Full Color</li>
                            <li>Highlights</li>
                            <li>Balayage</li>
                            <li>Root Touch-up</li>
                            <li>Color Correction</li>
                        </ul>
                    </div>

                    {/* Hair Care */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Hair Care</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Olaplex Treatment</li>
                            <li>Keratin Treatment</li>
                            <li>Moisturizing Hair Mask</li>
                            <li>Blow Dry</li>
                            <li>Scalp Treatment</li>
                        </ul>
                    </div>

                    {/* Styling */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Styling</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Bridal Styling</li>
                            <li>Curling Iron/Flat Iron Styling</li>
                            <li>Blowout and Styling</li>
                            <li>Braids and Creative Updos</li>
                        </ul>
                    </div>
                </div>

                <p className="text-lg text-gray-600 mt-6">
                    No matter which treatment you choose, you can expect top-quality service and an experience that leaves you feeling satisfied and radiant.
                </p>
            </div>
        </div>
    )
}

export default TreatmentsPage;
