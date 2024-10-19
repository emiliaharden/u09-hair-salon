const AboutPage = () => {
    return (
        <div className="p-4 text-center mt-10 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">Om oss</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            {/* Första raden */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4 items-start">
                <div className="flex flex-col items-center max-w-xs mx-auto">
                    <div className="w-[18rem] h-[22rem] bg-gray-300 mb-4"></div> {/* Placeholder för bild */}
                </div>
                <div className="flex flex-col justify-start items-start max-w-xs mx-auto">
                    <h3 className="text-xl font-bold">Frisör</h3>

                    <p className="text-gray-700 text-left mt-6">
                        Med en passion för att skapa vackra frisyrer och ett öga för detaljer, är vår trainee specialiserad på att hantera och styla lockigt hår. Genom noggrann utbildning har hon utvecklat en teknik som ger fantastiska resultat för alla hårtyper.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Utbildning: Trainee <br />
                        Specialité: Lockigt hår
                    </p>
                </div>
            </div>

            {/* Andra raden */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4 items-start">
                <div className="flex flex-col justify-start items-start max-w-xs mx-auto order-last md:order-first">
                    <h3 className="text-xl font-bold">Frisör</h3>

                    <p className="text-gray-700 text-left mt-6">
                        Vår frisör brinner för kreativitet och personlig service. Med en utbildning inom de senaste teknikerna har hon förmågan att skapa trendiga frisyrer som är både hållbara och stilfulla.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Utbildning: Trainee <br />
                        Specialité: Lockigt hår
                    </p>
                </div>
                <div className="flex flex-col items-center max-w-xs mx-auto">
                    <div className="w-[18rem] h-[22rem] bg-gray-300 mb-4"></div> {/* Placeholder för bild */}
                </div>
            </div>

            {/* Tredje raden */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4 items-start">
                <div className="flex flex-col items-center max-w-xs mx-auto">
                    <div className="w-[18rem] h-[22rem] bg-gray-300 mb-1"></div> {/* Placeholder för bild */}
                </div>
                <div className="flex flex-col justify-start items-start max-w-xs mx-auto">
                    <h3 className="text-xl font-bold">Frisör</h3>

                    <p className="text-gray-700 text-left mt-6">
                        Med expertis inom lockigt hår och en grundlig utbildning, har denna frisör en förmåga att lyfta fram kundens naturliga skönhet genom skräddarsydda klippningar och behandlingar.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Utbildning: Trainee <br />
                        Specialité: Lockigt hår
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage;
