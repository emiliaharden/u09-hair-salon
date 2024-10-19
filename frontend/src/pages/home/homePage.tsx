import BookingLink from '@/components/BookingLink'
import { Button } from '@/components/ui/button'

const HomePage = () => {
    return (
        <div className="p-4 text-center mt-10">
            <h2 className="text-3xl font-bold mb-4">Välommen till oss!</h2>
            <hr className="mt-2 mb-4 border-t-2 border-gray-300 w-3/4 mx-auto" />

            <p className="text-lg text-gray-600 w-3/4 mx-auto">
                På Salong Saxen erbjuder vi en upplevelse som kombinerar stil och perfektion.
                Upptäck våra exklusiva behandlingar, utformade för att ge dig en känsla av lyx och
                välbefinnande. Våra skickliga frisörer ser till att varje klippning och behandling
                är skräddarsydd för att framhäva din unika stil och personlighet.
            </p>
            <br />
            <p className="text-lg text-gray-600 w-3/4 mx-auto">
                Boka din tid idag och låt oss ta hand om dig med personlig omsorg och expertis. Hos
                oss är varje klippning och behandling "klippt och skuren" för att ge dig det allra
                bästa.
            </p>

            <BookingLink>
                <Button size="lg" className="mt-8">
                    {' '}
                    Vill du boka tid?{' '}
                </Button>
            </BookingLink>
            <div className="w-full h-64 bg-gray-200 mt-10 mb-8 flex justify-center items-end gap-x-4 pb-6">
                <BookingLink>
                    <Button
                        variant="outline"
                        size="lg"
                        className="w-48 h-16 flex flex-col justify-center items-center"
                    >
                        <span>Vill du boka tid?</span>
                    </Button>
                </BookingLink>
                <Button
                    variant="outline"
                    size="lg"
                    className="w-48 h-16 flex flex-col justify-center items-center"
                >
                    <span>Ring oss</span>
                    <span>08-XXX XX XX</span>
                </Button>
            </div>
        </div>
    )
}

export default HomePage
