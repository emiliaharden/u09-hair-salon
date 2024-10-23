const AboutPage = () => {
    return (
        <div className="p-4 text-center mt-10 min-h-screen">
            <h2 className="text-3xl font-bold mb-4">About Us</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4 items-start">
                <div className="flex flex-col items-center max-w-xs mx-auto">
                    <div className="w-[18rem] h-[22rem] bg-gray-300 mb-4"></div>{' '}
                    {/* Placeholder for image */}
                </div>
                <div className="flex flex-col justify-start items-start max-w-xs mx-auto">
                    <h3 className="text-xl font-bold">Hairdresser</h3>

                    <p className="text-gray-700 text-left mt-6">
                        With a passion for creating beautiful hairstyles and an eye for detail, our
                        trainee specializes in managing and styling curly hair. Through careful
                        training, she has developed a technique that produces amazing results for
                        all hair types.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Education: Trainee <br />
                        Specialty: Curly hair
                    </p>
                </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4 items-start">
                <div className="flex flex-col justify-start items-start max-w-xs mx-auto order-last md:order-first">
                    <h3 className="text-xl font-bold">Hairdresser</h3>

                    <p className="text-gray-700 text-left mt-6">
                        Our hairdresser is passionate about creativity and personalized service.
                        With training in the latest techniques, she has the ability to create trendy
                        hairstyles that are both durable and stylish.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Education: Trainee <br />
                        Specialty: Curly hair
                    </p>
                </div>
                <div className="flex flex-col items-center max-w-xs mx-auto">
                    <div className="w-[18rem] h-[22rem] bg-gray-300 mb-4"></div>{' '}
                    {/* Placeholder for image */}
                </div>
            </div>

            {/* Third Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4 items-start">
                <div className="flex flex-col items-center max-w-xs mx-auto">
                    <div className="w-[18rem] h-[22rem] bg-gray-300 mb-1"></div>{' '}
                    {/* Placeholder for image */}
                </div>
                <div className="flex flex-col justify-start items-start max-w-xs mx-auto">
                    <h3 className="text-xl font-bold">Hairdresser</h3>

                    <p className="text-gray-700 text-left mt-6">
                        With expertise in curly hair and thorough training, this hairdresser has a
                        knack for highlighting the client’s natural beauty through customized cuts
                        and treatments.
                    </p>
                    <p className="text-gray-600 mt-4">
                        Education: Trainee <br />
                        Specialty: Curly hair
                    </p>
                </div>
            </div>
        </div>
    )
}

export default AboutPage
