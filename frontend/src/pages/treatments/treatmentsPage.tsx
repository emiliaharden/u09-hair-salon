const TreatmentsPage = () => {
    return (
        <div className="p-4 text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Våra behandlingar</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            <p className="text-lg text-gray-600 w-3/4 mx-auto mb-6">
                Vi erbjuder ett brett utbud av behandlingar för att få dig att känna och se ditt bästa ut. Från klippningar till färgbehandlingar – utforska våra tjänster och hitta det perfekta alternativet för dina behov.
            </p>

            <div className="w-3/4 mx-auto border border-gray-300 rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Klippningar */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Klippningar</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Damklippning</li>
                            <li>Herrklippning</li>
                            <li>Barnklippning</li>
                            <li>Skäggtrimning</li>
                            <li>Klippning & Styling</li>
                            <li>Luggklippning</li>
                            <li>Maskinklippning</li>
                        </ul>
                    </div>

                    {/* Färgbehandlingar */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Färgbehandlingar</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Helfärg</li>
                            <li>Slingor</li>
                            <li>Balayage</li>
                            <li>Toning</li>
                            <li>Root Touch-up</li>
                            <li>Blondering</li>
                            <li>Färgkorrigering</li>
                        </ul>
                    </div>

                    {/* Hårvård */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Hårvård</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Olaplex behandling</li>
                            <li>Keratinbehandling</li>
                            <li>Återfuktande hårmask</li>
                            <li>Blow Dry</li>
                            <li>Scalp Treatment (hårbottensbehandling)</li>
                        </ul>
                    </div>

                    {/* Styling */}
                    <div>
                        <h4 className="text-xl font-medium mb-4">Styling</h4>
                        <ul className="list-none space-y-1 text-gray-600">
                            <li>Festuppsättning</li>
                            <li>Bröllopsstyling</li>
                            <li>Locktång/Plattång-styling</li>
                            <li>Fön och styling</li>
                            <li>Flätor och kreativa uppsättningar</li>
                        </ul>
                    </div>
                </div>

                <p className="text-lg text-gray-600 mt-6">
                    Oavsett vilken behandling du väljer, kan du förvänta dig service av högsta kvalitet och en upplevelse som lämnar dig både nöjd och strålande.
                </p>
            </div>
        </div>
    )
}

export default TreatmentsPage;
