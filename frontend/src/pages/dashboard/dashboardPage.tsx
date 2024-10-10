import { Outlet } from 'react-router-dom'
import UserNavbar from './components/UserNavbar'

const DashboardPage = () => {
    return (
        <div>
            <UserNavbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardPage
