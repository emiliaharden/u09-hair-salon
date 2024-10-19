import { Outlet } from 'react-router-dom'
import UserNavbar from './components/UserNavbar'

const DashboardPage = () => {
    return (
        <div className="flex justify-between p-6 mt-10">
            <div className="w-full max-w-4xl h-[600px] p-6 bg-white shadow-md rounded-lg overflow-y-auto">
                <Outlet />
            </div>

            <div className="w-48 ml-4">
                <UserNavbar />
            </div>
        </div>
    )
}

export default DashboardPage
