const TreatmentsPage = () => {
    return (
        <div className="p-4 text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Våra behandlingar</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            <p className="text-lg text-gray-600 w-3/4 mx-auto">
                Vi erbjuder ett brett utbud av behandlingar för att få dig att känna och se ditt
                bästa ut. Från klippningar till färgbehandlingar – utforska våra tjänster och hitta
                det perfekta alternativet för dina behov.
            </p>

            <br />

            <h4 className="text-xl font-medium mb-4 text-left w-3/4 mx-auto">Haircuts</h4>
            <ul className="list-none text-left w-3/4 mx-auto space-y-1 text-gray-600">
                <li>Haircut - $40</li>
                <li>Haircut & Styling - $60</li>
                <li>Blow Dry - $30</li>
                <li>Color (Full Head) - $100</li>
                <li>Highlights (Full Head) - $120</li>
                <li>Balayage - $150</li>
                <li>Toning - $50</li>
                <li>Root Touch-up - $70</li>
                <li>Olaplex Treatment - $40</li>
                <li>Men's Haircut - $35</li>
                <li>Beard Trim - $20</li>
            </ul>

            <br />
            <p className="text-lg text-gray-600 w-3/4 mx-auto">
                Oavsett vilken behandling du väljer, kan du förvänta dig service av högsta kvalitet
                och en upplevelse som lämnar dig både nöjd och strålande.
            </p>
        </div>
    )
}

export default TreatmentsPage
