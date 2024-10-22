import { Outlet } from 'react-router-dom'
import UserNavbar from './components/UserNavbar'

const DashboardPage = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between p-6 mt-10">
            {/* Huvudinnehåll */}
            <div className="w-full max-w-4xl h-[600px] p-6 bg-white shadow-md rounded-lg overflow-y-auto">
                <Outlet />
            </div>

            {/* Navbar visas på sidan i desktop och döljs i mobilvyn */}
            <div className="hidden sm:block w-48 ml-4">
                <UserNavbar />
            </div>

            {/* Navbar visas längst ner i mobilversionen */}
            <div className="sm:hidden">
                <UserNavbar />
            </div>
        </div>
    )
}

export default DashboardPage
